import ApolloClient from 'apollo-boost';
import withApollo from 'next-with-apollo';

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
  });
}

export default withApollo(createClient);
