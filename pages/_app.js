import '../lib/fontAwesome';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maroonFlush: '#D62246',
  wineBerry: '#4B1D3F',
  surfieGreen: '#0E7C7B',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
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
