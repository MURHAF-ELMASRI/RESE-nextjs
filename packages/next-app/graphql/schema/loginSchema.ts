import gql from 'graphql-tag';

export const loginSchema = gql`
  enum UserStatus {
    pending
    active
  }

  type Query {
    greetings: String!
  }
  type User {
    id: Int!
    fullName: String!
    email: String!
    phone: String!
    status: UserStatus!
    token: String!
  }

  type LoginError {
    email: String
    password: String
  }

  union LoginOrError = LoginError | User

  type Mutation {
    login(email: String!, password: String!): LoginOrError!
  }
`;
