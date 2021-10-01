import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <title>XRPL取引所アドレス</title>
          <link rel="icon" type="image/svg" sizes="32x32" href="/favicon.svg" />
          <meta name="monetization" content="$ilp.tequ.dev"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
