import type { Maybe } from '@/core/shared/shared.types';
import { CopyToClipboardButton } from '@/core/ui/components/copy-to-clipboard-button';
import { ExternalLink } from '@/core/ui/components/external-link';

type UrlSummaryProps = {
  title: string;
  url: Maybe<string>;
  canBeCopied?: boolean;
};

export function UrlSummary({ title, url, canBeCopied }: UrlSummaryProps) {
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
