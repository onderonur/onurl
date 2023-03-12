import BaseLink, { BaseLinkProps } from './BaseLink';
import { FiExternalLink } from 'react-icons/fi';
import classNames from 'classnames';

type ExternalLinkProps = BaseLinkProps & {
  hasIcon?: boolean;
};

export default function ExternalLink({
  className,
  href,
  hasIcon,
  children,
  ...rest
}: ExternalLinkProps) {
  return (
    <BaseLink
      {...rest}
      className={classNames(className, 'inline-flex items-center gap-1')}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      {hasIcon && <FiExternalLink className="h-4 w-4" />}
    </BaseLink>
  );
}
