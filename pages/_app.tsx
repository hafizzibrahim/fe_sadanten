import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
      </Head>

      <MantineProvider
        theme={{
          colors: {
            brand: [
              '#f0f9ff',
              '#e0f2fe',
              '#bae6fd',
              '#7dd3fc',
              '#38bdf8',
              '#0ea5e9',
              '#0284c7',
              '#155e75',
              '#164e63',
              '#082f49',
            ],
          },
          primaryColor: 'blue',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}