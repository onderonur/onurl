import type { Maybe } from '@/core/shared/shared.types';
import { Alert } from '@/core/ui/components/alert';
import { Divider } from '@/core/ui/components/divider';
import { Paper } from '@/core/ui/components/paper';
import { ShareButtons } from '@/core/ui/components/share-buttons';
import { UrlQrCode } from '@/core/ui/components/url-qr-code';
import { UrlSummary } from '@/features/short-urls/components/url-summary';
import type { ShortUrl } from '@prisma/client';

type ShortUrlResultProps = {
  shortUrl: Maybe<ShortUrl>;
  error: Maybe<string>;
};

export function ShortUrlResult({ shortUrl, error }: ShortUrlResultProps) {
  const url = shortUrl?.url;
  const alias = shortUrl?.alias;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const shortenedUrl = alias ? `${baseUrl}/${alias}` : undefined;

  if (error) {
    return (
      <Paper>
        <Alert type="error" message={error} />
      </Paper>
    );
  }

  if (!url || !shortenedUrl) return null;

  return (
    <Paper className="flex flex-col gap-2">
      <h2 className="sr-only">Shortened URL Result</h2>
      <Alert
        type="success"
        message="Your new URL has been created successfully!"
      />
      <Divider />
      <UrlSummary title="Old URL" url={url} />
      <Divider />
      <UrlSummary title="New URL" url={shortenedUrl} canBeCopied />
      <Divider />
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[256px]">
          <UrlQrCode url={shortenedUrl} size={256} />
        </div>
      </div>
      <Divider />
      <div className="mt-2">
        <ShareButtons url={shortenedUrl} />
      </div>
    </Paper>
  );
}
