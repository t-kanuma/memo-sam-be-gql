import {
  DynamoDBDocumentClient,
  UpdateCommand,
  UpdateCommandInput,
  UpdateCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { AppSyncResolverHandler } from "aws-lambda";
import { getUserId } from "memoapp-gql-common";
import {
  MutationUpdateMemoArgs,
  UpdateMemoInput,
} from "../../gql/generated/appsync";

const docClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: process.env.REGION })
);

export const lambdaHandler: AppSyncResolverHandler<
  MutationUpdateMemoArgs,
  string
> = async (event) => {
  const userId = getUserId(event);
  const memoToUpdate = event.arguments.memo;
  if (!isValidMemo(memoToUpdate)) {
    throw new Error("memo is not valid.");
  }

  const { id, title, text, archived, done, favorite } = memoToUpdate;
  const params: UpdateCommandInput = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: userId,
      id: id,
    },
    ExpressionAttributeNames: {
      "#te": "text",
    },
    UpdateExpression:
      "set title= :ti, #te= :te, archived = :a, done = :d, favorite = :f",
    ExpressionAttributeValues: {
      ":ti": title,
      ":te": text,
      ":a": archived,
      ":d": done,
      ":f": favorite,
    },
  };
  try {
    const updateResp: UpdateCommandOutput = await docClient.send(
      new UpdateCommand(params)
    );
    console.log(`updateResp: ${JSON.stringify(updateResp)} `);

    return "update memo successfully.";
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `error on updating memo on db: ${JSON.stringify(err.message)}`
      );
    } else {
      throw err;
    }
  }
};

const isValidMemo = (memo: UpdateMemoInput): boolean => {
  return !(!memo.title || !memo.text);
};
