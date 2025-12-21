import type { Maybe } from '@/core/shared/types';
import { CopyToClipboardButton } from '@/core/ui/components/copy-to-clipboard-button';
import { ExternalLink } from '@/core/ui/components/external-link';

type UrlSummaryProps = {
  title: string;
  url: Maybe<string>;
  canBeCopied?: boolean;
};

export function UrlSummary({ title, url, canBeCopied }: UrlSummaryProps) {
  if (!url) return null;

  return (
    <div className="flex flex-wrap items-start justify-between gap-2">
      <div>
        <h3 className="text-text-700 font-bold">{title}</h3>
        <ExternalLink href={url} hasIcon className="break-all">
          {url}
        </ExternalLink>
        <p className="text-text-500 text-sm">
          <span className="font-semibold">{url.length}</span> characters
        </p>
      </div>
      {canBeCopied ? <CopyToClipboardButton text={url} /> : null}
    </div>
  );
}
