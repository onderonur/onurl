import React from 'react';
import { APP_TITLE } from '@/common/CommonUtils';
import { DefaultSeoProps, DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';

const getDefaultSeoConfig = (pathname: string): DefaultSeoProps => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}${pathname}`;
  const title = APP_TITLE;
  const description = `${APP_TITLE} is a URL shortener which makes it easy to shorten and share your short URLs.`;
  return {
    title,
    canonical: url,
    description,
    openGraph: {
      url,
      title,
      type: 'website',
      description,
      site_name: APP_TITLE,
      images: [
        {
          url: `${baseUrl}/logo_400.png`,
          height: 400,
          width: 400,
          alt: `${APP_TITLE} large logo`,
        },
        {
          url: `${baseUrl}/logo_200.png`,
          height: 200,
          width: 200,
          alt: `${APP_TITLE} medium logo`,
        },
        {
          url: `${baseUrl}/logo_80.png`,
          height: 80,
          width: 80,
          alt: `${APP_TITLE} small logo`,
        },
      ],
    },
    additionalMetaTags: [
      { name: 'application-name', content: title },
      { property: 'dc:creator', content: 'Onur Önder' },
    ],
  };
};

function BaseDefaultSeo() {
  const router = useRouter();

  return <DefaultSeo {...getDefaultSeoConfig(router.pathname)} />;
}

export default BaseDefaultSeo;
