import Document, { Head, Main, NextScript } from 'next/document';
import { GoogleFont, TypographyStyle } from 'react-typography';

import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import typography from '../lib/typography';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          {this.props.styleTags}
          <script src="https://kit.fontawesome.com/10e3e50272.js" />
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
