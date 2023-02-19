import gql from 'graphql-tag';

export const Error = gql`
  interface Error {
    ok: Boolean!
    status: Int!
  }
`;

export const ErrorDescription = gql`
  interface ErrorDescription {
    fields: JSON
  }
`;
