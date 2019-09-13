import ApolloClient, { gql } from 'apollo-boost';

import withApollo from 'next-with-apollo';

export const LOCAL_STATE_QUERY = gql`
  query {
    isCreateDeckDialogOpen @client
    notification @client {
      headerText
      bodyText
      isVisible
    }
  }
`;

export const TOGGLE_CREATE_DECK_DIALOG_MUTATION = gql`
  mutation {
    toggleCreateDeckDialog @client
  }
`;

export const SHOW_NOTIFICATION_MUTATION = gql`
  mutation SHOW_NOTIFICATION_MUTATION($headerText: String!, $bodyText: String!) {
    showNotification(headerText: $headerText, bodyText: $bodyText) @client
  }
`;

export const HIDE_NOTIFICATION_MUTATION = gql`
  mutation {
    hideNotification @client
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
          showNotification(_, { headerText, bodyText }, { cache }) {
            const data = {
              data: {
                notification: {
                  __typename: 'Notification',
                  isVisible: true,
                  headerText,
                  bodyText,
                },
              },
            };
            cache.writeData(data);
            return data;
          },
          hideNotification(_, variables, { cache }) {
            const data = {
              data: {
                notification: {
                  __typename: 'Notification',
                  isVisible: false,
                  headerText: '',
                  bodyText: '',
                },
              },
            };
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        isCreateDeckDialogOpen: false,
        notification: {
          __typename: 'Notification',
          isVisible: false,
          headerText: '',
          bodyText: '',
        },
      },
    },
  });
}

export default withApollo(createClient);
