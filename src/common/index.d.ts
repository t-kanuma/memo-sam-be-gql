import { AppSyncResolverEvent } from "aws-lambda";

export const getUserId: <T, R>(event: AppSyncResolverEvent<T, R>) => string;
