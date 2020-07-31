import React from 'react';
import { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  theme as chakraTheme,
  CSSResetProps,
} from '@chakra-ui/core';
import { appTitle } from '@/constants';
import { DefaultSeoProps, DefaultSeo } from 'next-seo';
import { useRouter } from 'next/dist/client/router';
import customTheme from '@/theme';

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

const getCSSResetConfig: CSSResetProps['config'] = (theme, defaultConfig) => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...defaultConfig!,
    light: customTheme,
  };
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  return (
    <>
      <DefaultSeo {...getDefaultSeoConfig(router.pathname)} />
      <ThemeProvider theme={chakraTheme}>
        <ColorModeProvider value="light">
          <CSSReset config={getCSSResetConfig} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ColorModeProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
