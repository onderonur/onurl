import { FiExternalLink } from 'react-icons/fi';
import type { BaseLinkProps } from './base-link';
import { BaseLink } from './base-link';

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
