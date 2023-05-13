import BaseLink, { BaseLinkProps } from './base-link';
import { FiExternalLink } from 'react-icons/fi';

type ExternalLinkProps = BaseLinkProps & {
  hasIcon?: boolean;
};

export default function ExternalLink({
  href,
  hasIcon,
  children,
  ...rest
}: ExternalLinkProps) {
  return (
    <BaseLink {...rest} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      {hasIcon && <FiExternalLink className="inline ml-1 align-baseline" />}
    </BaseLink>
  );
}
