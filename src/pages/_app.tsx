import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Seo />
      <div>
        <Toaster
          position='top-right'
          toastOptions={{
            style: { backgroundColor: '#262626', color: 'white' },
          }}
        />
      </div>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
