import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
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
  params: ErrorParams;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Error: ResolversTypes['LoginError'] | ResolversTypes['loginByTokenError'];
  ErrorDescription: never;
  ErrorParams: ResolverTypeWrapper<ErrorParams>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  LoginError: ResolverTypeWrapper<LoginError>;
  LoginOrError: ResolversTypes['LoginError'] | ResolversTypes['User'];
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserOrError: ResolversTypes['User'] | ResolversTypes['loginByTokenError'];
  UserStatus: UserStatus;
  loginByTokenError: ResolverTypeWrapper<LoginByTokenError>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Error: ResolversParentTypes['LoginError'] | ResolversParentTypes['loginByTokenError'];
  ErrorDescription: never;
  ErrorParams: ErrorParams;
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  LoginError: LoginError;
  LoginOrError: ResolversParentTypes['LoginError'] | ResolversParentTypes['User'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  User: User;
  UserOrError: ResolversParentTypes['User'] | ResolversParentTypes['loginByTokenError'];
  loginByTokenError: LoginByTokenError;
};

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  __resolveType: TypeResolveFn<'LoginError' | 'loginByTokenError', ParentType, ContextType>;
  params?: Resolver<ResolversTypes['ErrorParams'], ParentType, ContextType>;
};

export type ErrorDescriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ErrorDescription'] = ResolversParentTypes['ErrorDescription']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  fields?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
};

export type ErrorParamsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ErrorParams'] = ResolversParentTypes['ErrorParams']> = {
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LoginErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginError'] = ResolversParentTypes['LoginError']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  params?: Resolver<ResolversTypes['ErrorParams'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginOrErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginOrError'] = ResolversParentTypes['LoginOrError']> = {
  __resolveType: TypeResolveFn<'LoginError' | 'User', ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<ResolversTypes['LoginOrError'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  loginByToken?: Resolver<ResolversTypes['UserOrError'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  greetings?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['UserStatus'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserOrErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserOrError'] = ResolversParentTypes['UserOrError']> = {
  __resolveType: TypeResolveFn<'User' | 'loginByTokenError', ParentType, ContextType>;
};

export type LoginByTokenErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['loginByTokenError'] = ResolversParentTypes['loginByTokenError']> = {
  params?: Resolver<ResolversTypes['ErrorParams'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Error?: ErrorResolvers<ContextType>;
  ErrorDescription?: ErrorDescriptionResolvers<ContextType>;
  ErrorParams?: ErrorParamsResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  LoginError?: LoginErrorResolvers<ContextType>;
  LoginOrError?: LoginOrErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserOrError?: UserOrErrorResolvers<ContextType>;
  loginByTokenError?: LoginByTokenErrorResolvers<ContextType>;
};

