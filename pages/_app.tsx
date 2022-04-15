import React from 'react';
import { AppProps } from 'next/app';
import Layout from '@/layout/Layout';
import BaseThemeProvider from '@/theme/BaseThemeProvider';
import BaseDefaultSeo from '@/seo/BaseDefaultSeo';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '@/theme/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <BaseDefaultSeo />
      <BaseThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BaseThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
