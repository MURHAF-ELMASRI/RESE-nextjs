import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type Error = {
  ok: Scalars['Boolean'];
  status: Scalars['Int'];
};

export type ErrorDescription = {
  fields?: Maybe<Scalars['JSON']>;
};

export type LoginError = {
  __typename?: 'LoginError';
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type LoginOrError = LoginError | User;

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginOrError;
  loginByToken: UserOrError;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginByTokenArgs = {
  token: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  greetings: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['Int'];
  phone: Scalars['String'];
  status: UserStatus;
  token: Scalars['String'];
};

export type UserOrError = User | LoginByTokenError;

export enum UserStatus {
  Active = 'active',
  Pending = 'pending'
}

export type LoginByTokenError = Error & {
  __typename?: 'loginByTokenError';
  ok: Scalars['Boolean'];
  status: Scalars['Int'];
};

export type LoginByTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type LoginByTokenMutation = { __typename?: 'Mutation', loginByToken: { __typename: 'User', id: number, fullName: string, phone: string, token: string, email: string, userStatus: UserStatus } | { __typename: 'loginByTokenError', ok: boolean, a: number } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'LoginError', password?: string | null, emailField?: string | null } | { __typename: 'User', id: number, fullName: string, phone: string, status: UserStatus, token: string, email: string } };


export const LoginByTokenDocument = gql`
    mutation LoginByToken($token: String!) {
  loginByToken(token: $token) {
    __typename
    ... on User {
      id
      fullName
      phone
      userStatus: status
      token
      email
    }
    ... on Error {
      ok
      a: status
    }
  }
}
    `;
export type LoginByTokenMutationFn = Apollo.MutationFunction<LoginByTokenMutation, LoginByTokenMutationVariables>;

/**
 * __useLoginByTokenMutation__
 *
 * To run a mutation, you first call `useLoginByTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginByTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginByTokenMutation, { data, loading, error }] = useLoginByTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useLoginByTokenMutation(baseOptions?: Apollo.MutationHookOptions<LoginByTokenMutation, LoginByTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginByTokenMutation, LoginByTokenMutationVariables>(LoginByTokenDocument, options);
      }
export type LoginByTokenMutationHookResult = ReturnType<typeof useLoginByTokenMutation>;
export type LoginByTokenMutationResult = Apollo.MutationResult<LoginByTokenMutation>;
export type LoginByTokenMutationOptions = Apollo.BaseMutationOptions<LoginByTokenMutation, LoginByTokenMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    __typename
    ... on User {
      id
      fullName
      phone
      status
      token
      email
    }
    ... on LoginError {
      password
      emailField: email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;