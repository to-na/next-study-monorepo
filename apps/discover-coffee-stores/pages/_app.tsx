import StoreProvider from '../store/storeContext';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Head>
        <title>Welcome to discover-coffee-stores!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </StoreProvider>
  );
}

export default CustomApp;
