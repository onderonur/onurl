import Alert from '@/common/Alert';
import connectToDb from '@/db/connectToDb';
import { isShortUrlExpired } from '@/short-url/ShortUrlUtils';
import { redirect } from 'next/navigation';

type AliasPageProps = {
  params: {
    alias: string;
  };
};

export default async function AliasPage({ params }: AliasPageProps) {
  const prisma = await connectToDb();

  const { alias } = params;

  const shortUrl = await prisma.shortUrl.findFirst({
    where: { alias },
  });

  if (!shortUrl) {
    return <Alert type="error" message="URL not found" />;
  }

  if (isShortUrlExpired(shortUrl)) {
    return <Alert type="error" message="URL is expired" />;
  }

  await prisma.shortUrl.update({
    where: { alias },
    data: { clicks: shortUrl.clicks + 1 },
  });

  return redirect(shortUrl.url);
}
