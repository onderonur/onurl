import { Inter } from 'next/font/google';
import Layout from '@/layout/layout';
import { APP_TITLE } from '@/common/common-utils';
import classNames from 'classnames';
import '@/styles/global.css';

const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
});

const title = APP_TITLE;
const description = `${APP_TITLE} is a URL shortener which makes it easy to shorten and share your URLs.`;

export const metadata = {
  title,
  description,
  themeColor: '#e2f0ec',
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
      <body className="bg-gradient-to-r from-rose-100 to-teal-100">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
