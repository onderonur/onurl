import { Link, LinkProps, styled } from '@mui/material';
import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const LinkIcon = styled(ExitToAppIcon)({
  verticalAlign: 'text-bottom',
});

type ExternalLinkProps = LinkProps & { hasIcon?: boolean };

const ExternalLink: React.FC<ExternalLinkProps> = React.forwardRef<
  React.ComponentRef<typeof Link>,
  ExternalLinkProps
>(function ExternalLink({ children, href, hasIcon, ...rest }, ref) {
  return (
    <Link
      ref={ref}
      {...rest}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children} {hasIcon && <LinkIcon fontSize="small" />}
    </Link>
  );
});

export default ExternalLink;
