import React from 'react';
import { LinkProps, Link, Icon } from '@chakra-ui/core';

const ExternalLink: React.FC<LinkProps> = ({ children, ...rest }) => {
  return (
    <Link color="purple.600" {...rest} isExternal>
      {children} <Icon name="external-link" mx="2px" />
    </Link>
  );
};

export default ExternalLink;
