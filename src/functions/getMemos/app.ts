import {
  DynamoDBDocumentClient,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { AppSyncResolverHandler } from "aws-lambda";
import { QueryMemosArgs, Memo } from "../../gql/generated/appsync";
import { getUserId } from "memoapp-gql-common";

const docClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: process.env.REGION })
);

// functionのgenericsは、<引数の型, 返り値の型>という形で書く
export const lambdaHandler: AppSyncResolverHandler<
  QueryMemosArgs,
  Memo[]
> = async (event) => {
  const userId = getUserId(event);

  const params: QueryCommandInput = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":archived": event.arguments.archived,
      ":userId": userId,
    },
    FilterExpression: "archived = :archived",
  };

  try {
    const memos: QueryCommandOutput = await docClient.send(
      new QueryCommand(params)
    );

    // 開発側で自明のため、アサーションしている。
    return memos.Items as Memo[];
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `error on retrieving data from db: ${JSON.stringify(err.message)}`
      );
    } else {
      throw err;
    }
  }
};
