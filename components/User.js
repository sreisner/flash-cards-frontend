import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      firstName
      lastName
      decks(orderBy: createdAt_DESC) {
        id
        name
        cards(orderBy: createdAt_DESC) {
          id
          front
          back
        }
      }
    }
  }
`;

export { CURRENT_USER_QUERY };
