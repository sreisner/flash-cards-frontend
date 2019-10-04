import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';

import withApollo from 'next-with-apollo';

export const LOCAL_STATE_QUERY = gql`
  query {
    createDeckDialog @client {
      isOpen
    }
    updateDeckDialog @client {
      id
      isOpen
    }
    createCardDialog @client {
      deckId
      isOpen
    }
    updateCardDialog @client {
      id
      isOpen
    }
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

export const OPEN_UPDATE_DECK_DIALOG_MUTATION = gql`
  mutation OPEN_UPDATE_DECK_DIALOG_MUTATION($id: ID!) {
    openUpdateDeckDialog(id: $id) @client
  }
`;

export const CLOSE_UPDATE_DECK_DIALOG_MUTATION = gql`
  mutation {
    closeUpdateDeckDialog @client
  }
`;

export const OPEN_UPDATE_CARD_DIALOG_MUTATION = gql`
  mutation OPEN_UPDATE_DECK_DIALOG_MUTATION($id: ID!) {
    openUpdateCardDialog(id: $id) @client
  }
`;

export const CLOSE_UPDATE_CARD_DIALOG_MUTATION = gql`
  mutation {
    closeUpdateCardDialog @client
  }
`;

export const OPEN_CREATE_CARD_DIALOG_MUTATION = gql`
  mutation OPEN_CREATE_CARD_DIALOG_MUTATION($deckId: ID!) {
    openCreateCardDialog(deckId: $deckId) @client
  }
`;

export const CLOSE_CREATE_CARD_DIALOG_MUTATION = gql`
  mutation {
    closeCreateCardDialog @client
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

function createClient({ headers, initialState }) {
  return new ApolloClient({
    uri: process.env.YOGA_ENDPOINT,
    cache: new InMemoryCache().restore(initialState || {}),
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
            const { createDeckDialog } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            const data = {
              data: {
                createDeckDialog: {
                  __typename: 'CreateDeckDialog',
                  isOpen: !createDeckDialog.isOpen,
                },
              },
            };
            cache.writeData(data);
            return data;
          },
          openUpdateDeckDialog(_, { id }, { cache }) {
            const data = {
              data: {
                updateDeckDialog: {
                  __typename: 'UpdateDeckDialog',
                  isOpen: true,
                  id,
                },
              },
            };
            cache.writeData(data);
            return data;
          },
          closeUpdateDeckDialog(_, variables, { cache }) {
            const data = {
              data: {
                updateDeckDialog: {
                  __typename: 'UpdateDeckDialog',
                  isOpen: false,
                  id: '',
                },
              },
            };
            cache.writeData(data);
            return data;
          },
          openUpdateCardDialog(_, { id }, { cache }) {
            const data = {
              data: {
                updateCardDialog: {
                  __typename: 'UpdateCardDialog',
                  isOpen: true,
                  id,
                },
              },
            };
            cache.writeData(data);
            return data;
          },
          closeUpdateCardDialog(_, variables, { cache }) {
            const data = {
              data: {
                updateCardDialog: {
                  __typename: 'UpdateCardDialog',
                  isOpen: false,
                  id: '',
                },
              },
            };
            cache.writeData(data);
            return data;
          },
          openCreateCardDialog(_, { deckId }, { cache }) {
            const data = {
              data: {
                createCardDialog: {
                  __typename: 'CreateCardDialog',
                  isOpen: true,
                  deckId,
                },
              },
            };
            cache.writeData(data);
            return data;
          },
          closeCreateCardDialog(_, variables, { cache }) {
            const data = {
              data: {
                createCardDialog: {
                  __typename: 'CreateCardDialog',
                  isOpen: false,
                  deckId: '',
                },
              },
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
        createDeckDialog: {
          __typename: 'CreateDeckDialog',
          isOpen: false,
        },
        updateDeckDialog: {
          __typename: 'UpdateDeckDialog',
          isOpen: false,
          id: '',
        },
        createCardDialog: {
          __typename: 'CreateCardDialog',
          isOpen: false,
          deckId: '',
        },
        updateCardDialog: {
          __typename: 'UpdateCardDialog',
          isOpen: false,
          id: '',
        },
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
