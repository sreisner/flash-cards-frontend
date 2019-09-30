import '../lib/fontAwesome';
import '../static/custom.scss';

import { ApolloProvider } from '@apollo/react-hooks';
import App from 'next/app';
import AppLoading from '../components/AppLoading';
import { CURRENT_USER_QUERY } from '../components/User';
import Error from '../components/ErrorMessage';
import Page from '../components/Page';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import withData from '../lib/withData';

const theme = {
  maxWidth: '1000px',
};

/* eslint-disable react/prop-types */
const Inner = ({ Component, pageProps }) => {
  const { loading, error } = useQuery(CURRENT_USER_QUERY);
  if (loading) return <AppLoading />;
  if (error) return <Error error={error} />;

  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
};
/* eslint-enable react/prop-types */

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
          <Inner Component={Component} pageProps={pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withData(MyApp);
