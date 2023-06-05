import { AppSyncIdentityCognito, AppSyncResolverEvent } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";

export const getUserId = <T, R>(event: AppSyncResolverEvent<T, R>): string => {
  // 開発側で自明のため、アサーションしている。
  const cognitoIdentity = event.identity as AppSyncIdentityCognito;

  let userId = null;
  if (cognitoIdentity) {
    userId = cognitoIdentity.claims["cognito:username"];
  }

  if (!userId) {
    throw new Error("No userName Found");
  }

  // for layer test
  console.log(uuidv4());

  return userId;
};
