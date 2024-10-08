import type { BaseLinkProps } from '@/core/ui/components/base-link';
import { BaseLink } from '@/core/ui/components/base-link';
import { FiExternalLink } from 'react-icons/fi';

type ExternalLinkProps = BaseLinkProps & {
  hasIcon?: boolean;
};

export function ExternalLink({
  href,
  hasIcon,
  children,
  ...rest
}: ExternalLinkProps) {
  return (
    <BaseLink {...rest} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      {hasIcon ? (
        <FiExternalLink className="ml-1 inline align-baseline" />
      ) : null}
    </BaseLink>
  );
}
