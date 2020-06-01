import React from 'react';
import { LinkProps, Link, Icon } from '@chakra-ui/core';
import { doesUrlHasProtocol } from '@/utils';

const ExternalLink: React.FC<LinkProps> = ({ children, href, ...rest }) => {
  return (
    <Link
      color="purple.600"
      {...rest}
      href={href && !doesUrlHasProtocol(href) ? `//${href}` : href}
      isExternal
    >
      {children} <Icon name="external-link" mx="2px" />
    </Link>
  );
};

export default ExternalLink;
