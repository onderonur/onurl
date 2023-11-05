import type { Maybe } from '@/common/common-types';
import ExternalLink from '@/common/external-link';
import CopyToClipboardButton from '@/common/copy-to-clipboard-button';

type ShortUrlResultProps = {
  title: string;
  url: Maybe<string>;
  canBeCopied?: boolean;
};

export default function UrlSummary({
  title,
  url,
  canBeCopied,
}: ShortUrlResultProps) {
  if (!url) {
    return null;
  }

  return (
    <div className="flex justify-between items-start flex-wrap gap-2">
      <div>
        <h3 className="font-bold text-text-700">{title}</h3>
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
