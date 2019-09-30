import Head from 'next/head';
import React from 'react';

const Meta = () => (
  <Head>
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
    />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favico.ico" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <title>Simple Flash Cards</title>
  </Head>
);

export default Meta;
