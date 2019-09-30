import '../lib/fontAwesome';
import '../static/custom.scss';

import { ApolloProvider } from 'react-apollo';
import App from 'next/app';
import AppLoading from '../components/AppLoading';
import Error from '../components/ErrorMessage';
import Page from '../components/Page';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import User from '../components/User';
import withData from '../lib/withData';

const theme = {
  maxWidth: '1000px',
};

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <ThemeProvider theme={theme}>
          <User>
            {({ loading, error }) => {
              if (loading) return <AppLoading />;
              if (error) return <Error error={error} />;

              return (
                <Page>
                  <Component {...pageProps} />
                </Page>
              );
            }}
          </User>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withData(MyApp);
