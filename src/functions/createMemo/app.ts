import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
  PutCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { AppSyncResolverHandler } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import { getUserId } from "memoapp-gql-common";
import { Memo, MutationCreateMemoArgs } from "../../gql/generated/appsync";

const docClient: DynamoDBDocumentClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: process.env.REGION })
);

export const lambdaHandler: AppSyncResolverHandler<
  MutationCreateMemoArgs,
  string
> = async (event) => {
  const { title, text } = event.arguments.memo;
  if (!title || !text) {
    throw new Error("title or text is empty.");
  }

  const newMemo: Memo = {
    userId: getUserId(event),
    id: uuidv4(),
    archived: false,
    done: false,
    favorite: false,
    title: title,
    text: text,
  };

  const params: PutCommandInput = {
    TableName: process.env.TABLE_NAME,
    Item: {
      ...newMemo,
    },
  };
  try {
    const createResp: PutCommandOutput = await docClient.send(
      new PutCommand(params)
    );
    console.log(`createResp: ${JSON.stringify(createResp)} `);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `error on creating memo to db: ${JSON.stringify(err.message)}`
      );
    } else {
      throw err;
    }
  }

  // Notify that the memo is created
  const sqsClient: SQSClient = new SQSClient({ region: process.env.REGION });
  const sqsParams = {
    QueueUrl: process.env.QUEUE_URL,
    MessageBody: JSON.stringify(newMemo),
  };
  try {
    const sqsResp = await sqsClient.send(new SendMessageCommand(sqsParams));
    console.log(`sqsResp: ${JSON.stringify(sqsResp)}`);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `error on sending message to sqs: ${JSON.stringify(err.message)}`
      );
    } else {
      throw err;
    }
  }

  return "created memo successfully.";
};
