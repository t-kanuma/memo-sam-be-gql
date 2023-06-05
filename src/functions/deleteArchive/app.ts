import {
  DynamoDBDocumentClient,
  DeleteCommand,
  DeleteCommandInput,
  DeleteCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { AppSyncResolverHandler } from "aws-lambda";
import { MutationDeleteMemoArgs } from "../../gql/generated/appsync";
import { getUserId } from "memoapp-gql-common";

const docClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: process.env.REGION })
);
export const lambdaHandler: AppSyncResolverHandler<
  MutationDeleteMemoArgs,
  string
> = async (event) => {
  const userId = getUserId(event);

  const params: DeleteCommandInput = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: userId,
      id: event.arguments.id,
    },
  };

  try {
    const putResp: DeleteCommandOutput = await docClient.send(
      new DeleteCommand(params)
    );
    console.log(`deleteResp: ${JSON.stringify(putResp)} `);
    return "deleted archive successfully.";
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `error on deleting memo to db: ${JSON.stringify(err.message)}`
      );
    } else {
      throw err;
    }
  }
};
