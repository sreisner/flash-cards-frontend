import ApolloClient, { gql } from 'apollo-boost';

import withApollo from 'next-with-apollo';

export const LOCAL_STATE_QUERY = gql`
  query {
    isCreateDeckDialogOpen @client
  }
`;

export const TOGGLE_CREATE_DECK_DIALOG_MUTATION = gql`
  mutation {
    toggleCreateDeckDialog @client
  }
`;

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.YOGA_ENDPOINT,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    clientState: {
      resolvers: {
        Mutation: {
          toggleCreateDeckDialog(_, variables, { cache }) {
            const { isCreateDeckDialogOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            const data = {
              data: { isCreateDeckDialogOpen: !isCreateDeckDialogOpen },
            };
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        isCreateDeckDialogOpen: false,
      },
    },
  });
}

export default withApollo(createClient);
