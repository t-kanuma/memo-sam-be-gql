export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateMemoInput = {
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Memo = {
  __typename?: 'Memo';
  archived: Scalars['Boolean']['output'];
  done: Scalars['Boolean']['output'];
  favorite: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMemo?: Maybe<Scalars['String']['output']>;
  deleteMemo?: Maybe<Scalars['String']['output']>;
  updateMemo?: Maybe<Scalars['String']['output']>;
};


export type MutationCreateMemoArgs = {
  memo: CreateMemoInput;
};


export type MutationDeleteMemoArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateMemoArgs = {
  memo: UpdateMemoInput;
};

export type Query = {
  __typename?: 'Query';
  memos: Array<Memo>;
};


export type QueryMemosArgs = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateMemoInput = {
  archived: Scalars['Boolean']['input'];
  done: Scalars['Boolean']['input'];
  favorite: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};
