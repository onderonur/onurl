import type { Maybe } from '@/common/common-types';
import { CopyToClipboardButton } from '@/common/copy-to-clipboard-button';
import { ExternalLink } from '@/common/external-link';

type ShortUrlResultProps = {
  title: string;
  url: Maybe<string>;
  canBeCopied?: boolean;
};

export function UrlSummary({ title, url, canBeCopied }: ShortUrlResultProps) {
  if (!url) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-start justify-between gap-2">
      <div>
        <h3 className="font-bold text-text-700">{title}</h3>
        <ExternalLink href={url} hasIcon className="break-all">
          {url}
        </ExternalLink>
        <p className="text-sm text-text-500">
          <span className="font-semibold">{url.length}</span> characters
        </p>
      </div>
      {canBeCopied ? <CopyToClipboardButton text={url} /> : null}
    </div>
  );
}
