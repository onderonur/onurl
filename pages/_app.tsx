import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { appTitle } from '@/constants';
import { DefaultSeoProps, DefaultSeo } from 'next-seo';
import { useRouter } from 'next/dist/client/router';
import BaseThemeProvider from '@/components/BaseThemeProvider';

const getDefaultSeoConfig = (pathname: string): DefaultSeoProps => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}${pathname}`;
  const title = appTitle;
  const description = `${appTitle} is a URL shortener which makes it easy to shorten and share your short URLs.`;
  return {
    title,
    canonical: url,
    description,
    openGraph: {
      url,
      title,
      type: 'website',
      description,
      site_name: appTitle,
      images: [
        {
          url: `${baseUrl}/logo_400.png`,
          height: 400,
          width: 400,
          alt: 'OnURL large logo',
        },
        {
          url: `${baseUrl}/logo_200.png`,
          height: 200,
          width: 200,
          alt: 'OnURL medium logo',
        },
        {
          url: `${baseUrl}/logo_80.png`,
          height: 80,
          width: 80,
          alt: 'OnURL small logo',
        },
      ],
    },
    additionalMetaTags: [
      { name: 'application-name', content: title },
      { property: 'dc:creator', content: 'Onur Önder' },
    ],
  };
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <DefaultSeo {...getDefaultSeoConfig(router.pathname)} />
      <BaseThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BaseThemeProvider>
    </>
  );
};

export default MyApp;
