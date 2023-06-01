import { AppSyncIdentityCognito, AppSyncResolverEvent } from "aws-lambda";

export const getUserId = <T, R>(event: AppSyncResolverEvent<T, R>) => {
  // 開発側で自明のため、アサーションしている。
  const cognitoIdentity = event.identity as AppSyncIdentityCognito;

  let userId = null;
  if (cognitoIdentity) {
    userId = cognitoIdentity.claims["cognito:username"];
  }

  if (!userId) {
    throw new Error("No userName Found");
  }

  return userId;
};
