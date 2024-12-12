import type { BaseLinkProps } from '@/core/ui/components/next-link';
import { NextLink } from '@/core/ui/components/next-link';
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
    <NextLink {...rest} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      {hasIcon ? (
        <FiExternalLink className="ml-1 inline align-baseline" />
      ) : null}
    </NextLink>
  );
}
