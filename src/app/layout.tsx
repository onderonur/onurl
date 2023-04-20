import { Inter } from 'next/font/google';
import Layout from '@/layout/Layout';
import { APP_TITLE } from '@/common/CommonUtils';
import classNames from 'classnames';
import '@/styling/global.css';

const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
});

const title = APP_TITLE;
const description = `${APP_TITLE} is a URL shortener which makes it easy to shorten and share your short URLs.`;

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
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_TITLE,
    description,
    creator: '@onderonur_',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={classNames(inter.variable, 'font-sans')}>
      <body className="bg-background-200">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
