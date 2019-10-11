import Head from 'next/head';
import React from 'react';

const Meta = () => (
  <Head>
    <meta
      charset="utf-8"
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
    />
    <meta charSet="utf-8" />
    <meta
      name="description"
      content="Create and study flash cards with this simple, free app!"
    ></meta>
    <link rel="shortcut icon" href="/static/favicon.ico" />
    <link rel="preload" as="style" type="text/css" href="/static/nprogress.css" />
    <title>Simple Flash Cards</title>
  </Head>
);

export default Meta;
