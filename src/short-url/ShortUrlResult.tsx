'use client';

import Alert from '@/common/Alert';
import Button from '@/common/Button';
import { Maybe } from '@/common/CommonTypes';
import ExternalLink from '@/common/ExternalLink';
import UrlQrCode from '@/qr-code/UrlQrCode';
import ShareButtons from '@/social-share/ShareButtons';
import { useState } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';
import CopyToClipboard from 'react-copy-to-clipboard';

type ShortUrlResultProps = {
  url: Maybe<string>;
  shortenedUrl: Maybe<string>;
  error: Maybe<string>;
};

export default function ShortUrlResult({
  url,
  shortenedUrl,
  error,
}: ShortUrlResultProps) {
  const [hasCopied, setHasCopied] = useState(false);

  if (error) {
    return <Alert type="error" message={error} />;
  }

  if (!url || !shortenedUrl) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <Alert
        type="success"
        message="Your new URL has been created successfully!"
      />
      <div>
        <p>
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
        <div className="flex items-center">
          <p>
            <span className="font-semibold">New URL:</span>{' '}
            <ExternalLink href={shortenedUrl}>{shortenedUrl}</ExternalLink>
          </p>
          <div className="ml-1">
            <CopyToClipboard
              text={shortenedUrl}
              onCopy={() => {
                setHasCopied(true);
                setTimeout(() => {
                  setHasCopied(false);
                }, 2000);
              }}
            >
              <Button startIcon={<AiOutlineCopy />} size="small">
                {hasCopied ? 'Copied' : 'Copy'}
              </Button>
            </CopyToClipboard>
          </div>
        </div>
        <p>
          <span className="font-semibold">New URL Length:</span>{' '}
          {shortenedUrl.length} characters
        </p>
      </div>
      <div className="max-w-[256px]">
        <p className="font-semibold">QR Code:</p>
        <UrlQrCode url={shortenedUrl} size={256} />
      </div>
      <div className="mt-2">
        <ShareButtons url={shortenedUrl} />
      </div>
    </div>
  );
}
