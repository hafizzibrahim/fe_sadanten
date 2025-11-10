import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <MantineProvider>
      <Component {...pageProps} />
    </MantineProvider>
  );
}