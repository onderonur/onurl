'use client';

import Alert from '@/common/alert';
import Button from '@/common/button';
import { Maybe } from '@/common/common-types';
import ExternalLink from '@/common/external-link';
import UrlQrCode from '@/qr-codes/url-qr-code';
import ShareButtons from '@/social-share/share-buttons';
import { useRef, useState } from 'react';
import { AiOutlineCopy, AiOutlineCheck } from 'react-icons/ai';
import CopyToClipboard from 'react-copy-to-clipboard';
import { ShortUrl } from '@prisma/client';
import Divider from '@/common/divider';
import Paper from '@/common/paper';

type ShortUrlResultProps = {
  shortUrl: Maybe<ShortUrl>;
  error: Maybe<string>;
};

export default function ShortUrlResult({
  shortUrl,
  error,
}: ShortUrlResultProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const timerRef = useRef<Maybe<NodeJS.Timer>>(null);

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

  if (!url || !shortenedUrl) {
    return null;
  }

  return (
    <Paper className="flex flex-col gap-2">
      <Alert
        type="success"
        message="Your new URL has been created successfully!"
      />
      <Divider />
      <div>
        <p className="break-words">
          <span className="font-semibold">Old URL:</span>{' '}
          <ExternalLink href={url} hasIcon>
            {url}
          </ExternalLink>
        </p>
        <p>
          <span className="font-semibold">Old URL Length:</span> {url.length}{' '}
          characters
        </p>
      </div>
      <div>
        <p className="break-words">
          <span className="font-semibold">New URL:</span>{' '}
          <ExternalLink href={shortenedUrl}>{shortenedUrl}</ExternalLink>
          <CopyToClipboard
            text={shortenedUrl}
            onCopy={() => {
              setHasCopied(true);

              if (timerRef.current) {
                clearTimeout(timerRef.current);
              }

              timerRef.current = setTimeout(() => {
                setHasCopied(false);
              }, 2000);
            }}
          >
            <Button
              className="ml-1"
              startIcon={hasCopied ? <AiOutlineCheck /> : <AiOutlineCopy />}
              size="small"
            >
              {hasCopied ? 'Copied' : 'Copy'}
            </Button>
          </CopyToClipboard>
        </p>
        <p>
          <span className="font-semibold">New URL Length:</span>{' '}
          {shortenedUrl.length} characters
        </p>
      </div>
      <Divider />
      <div className="flex flex-col items-center">
        <div className="max-w-[256px] w-full">
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
