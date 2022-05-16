import { Global } from '@mantine/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Your source of daily do's"></meta>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Global
        styles={(theme: any) => ({
          '*, *::before, *::after': {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
          },

          html: {
            height: '100%',
          },

          body: {
            ...theme.fn.fontStyles(),
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
          },

          '#__next': {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          },
        })}
      />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
