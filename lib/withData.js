import { ApolloLink, Observable } from 'apollo-link';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import withApollo from 'next-with-apollo';

const request = async (operation, headers) => {
  operation.setContext({
    fetchOptions: {
      credentials: 'include',
    },
    headers,
  });
};

const requestLink = headers =>
  new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle;
        Promise.resolve(operation)
          .then(oper => request(oper, headers))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

const cache = new InMemoryCache();

function createClient({ headers }) {
  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      requestLink(headers),
      new HttpLink({
        uri: process.env.YOGA_ENDPOINT,
        credentials: 'include',
      }),
    ]),
    cache,
  });

  return client;
}

export default withApollo(createClient);
