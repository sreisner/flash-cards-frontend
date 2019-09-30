import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      firstName
      lastName
      decks {
        id
        name
        cards {
          id
          front
          back
        }
      }
    }
  }
`;

export { CURRENT_USER_QUERY };
