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
  params: ErrorParams;
};

export type ErrorDescription = {
  fields?: Maybe<Scalars['JSON']>;
};

export type ErrorParams = {
  __typename?: 'ErrorParams';
  ok: Scalars['Boolean'];
  status: Scalars['Int'];
};

export type LoginError = Error & {
  __typename?: 'LoginError';
  email?: Maybe<Scalars['String']>;
  params: ErrorParams;
  password?: Maybe<Scalars['String']>;
};

export type LoginOrError = LoginError | User;

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginOrError;
  loginByToken: UserOrError;
  signup: SignupError;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  signUpInput: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  greetings: Scalars['String'];
};

export type SignupError = Error & {
  __typename?: 'SignupError';
  email?: Maybe<Scalars['String']>;
  params: ErrorParams;
  phone?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['String'];
  phone: Scalars['String'];
  status: UserStatus;
};

export type UserOrError = User | LoginByTokenError;

export type UserStatus =
  | 'active'
  | 'pending';

export type UserType =
  | 'manger'
  | 'player';

export type LoginByTokenError = Error & {
  __typename?: 'loginByTokenError';
  params: ErrorParams;
};

export type SignUpInput = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  userType: UserType;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'LoginError', password?: string | null, emailField?: string | null, params: { __typename?: 'ErrorParams', ok: boolean, status: number } } | { __typename: 'User', id: string, fullName: string, phone: string, status: UserStatus, email: string } };

export type LoginByTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type LoginByTokenMutation = { __typename?: 'Mutation', loginByToken: { __typename: 'User', id: string, fullName: string, phone: string, status: UserStatus, email: string } | { __typename: 'loginByTokenError', params: { __typename?: 'ErrorParams', ok: boolean, status: number } } };

export type SignupMutationVariables = Exact<{
  signUpInput: SignUpInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename: 'SignupError', email?: string | null, phone?: string | null, params: { __typename?: 'ErrorParams', ok: boolean, status: number } } };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    __typename
    ... on User {
      id
      fullName
      phone
      status
      email
    }
    ... on LoginError {
      password
      emailField: email
      params {
        ok
        status
      }
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
export const LoginByTokenDocument = gql`
    mutation LoginByToken {
  loginByToken {
    __typename
    ... on User {
      id
      fullName
      phone
      status
      email
    }
    ... on loginByTokenError {
      params {
        ok
        status
      }
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
export const SignupDocument = gql`
    mutation Signup($signUpInput: signUpInput!) {
  signup(signUpInput: $signUpInput) {
    __typename
    ... on SignupError {
      email
      phone
      params {
        ok
        status
      }
    }
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      signUpInput: // value for 'signUpInput'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;