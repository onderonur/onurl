import Alert from '@/common/alert';
import { increaseShortUrlClicks } from '@/short-urls/short-url-actions';
import { getShortUrl } from '@/short-urls/short-url-fetchers';
import { isShortUrlExpired } from '@/short-urls/short-url-utils';
import { redirect } from 'next/navigation';

type AliasPageProps = {
  params: {
    alias: string;
  };
};

export default async function AliasPage({ params }: AliasPageProps) {
  const { alias } = params;

  const shortUrl = await getShortUrl(alias);

  if (!shortUrl) {
    return <Alert type="error" message="URL not found" />;
  }

  if (isShortUrlExpired(shortUrl)) {
    return <Alert type="error" message="URL is expired" />;
  }

  await increaseShortUrlClicks(alias);

  return redirect(shortUrl.url);
}
