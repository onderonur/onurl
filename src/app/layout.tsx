import { Inter } from 'next/font/google';
import Layout from '@/layout/Layout';
import { APP_TITLE } from '@/common/CommonUtils';
import '@/styling/global.css';

const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
});

const title = APP_TITLE;
const description = `${APP_TITLE} is a URL shortener which makes it easy to shorten and share your short URLs.`;
const images = [
  {
    url: `/logo_400.png`,
    height: 400,
    width: 400,
    alt: `${APP_TITLE} large logo`,
  },
  {
    url: `/logo_200.png`,
    height: 200,
    width: 200,
    alt: `${APP_TITLE} medium logo`,
  },
  {
    url: `/logo_80.png`,
    height: 80,
    width: 80,
    alt: `${APP_TITLE} small logo`,
  },
];

export const metadata = {
  title,
  description,
  themeColor: '#c7d2fe',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  creator: 'Onur Önder',
  applicationName: APP_TITLE,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    type: 'website',
    url: '/',
    description,
    siteName: APP_TITLE,
    images,
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_TITLE,
    description,
    creator: '@onderonur_',
    images,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="bg-background-200">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
