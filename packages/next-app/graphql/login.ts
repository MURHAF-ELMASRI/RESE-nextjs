import gql from 'graphql-tag';

export const loginSchema = gql`
  type Query {
    greetings: String
  }
  type User {
    fullName: String
    id: Int
  }

  type loginError {
    error: Boolean
    email: String
    password: String
  }

  union loginOrError = User | loginError

  type Mutation {
    login(email: String, password: String): loginOrError
  }
`;
