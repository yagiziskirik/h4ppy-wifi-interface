import { AppProps } from 'next/app';

import '@/styles/globals.css';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Seo />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
