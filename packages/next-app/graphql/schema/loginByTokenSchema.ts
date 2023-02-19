import gql from 'graphql-tag';

export const loginByTokenSchema = gql`
  enum UserStatus {
    pending
    active
  }

  type User {
    id: Int!
    fullName: String!
    email: String!
    phone: String!
    status: UserStatus!
    token: String!
  }

  type loginByTokenError implements Error {
    ok: Boolean!
    status: Int!
  }
`;
