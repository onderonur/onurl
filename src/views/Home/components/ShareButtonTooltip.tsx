import React from 'react';
import { Tooltip } from '@chakra-ui/core';

interface ShareButtonTooltipProps {
  name: string;
}

const ShareButtonTooltip = React.memo<
  React.PropsWithChildren<ShareButtonTooltipProps>
>(({ name, children }) => {
  const label = `Share on ${name}`;
  return (
    <Tooltip label={label} aria-label={label} hasArrow>
      {children}
    </Tooltip>
  );
});

export default ShareButtonTooltip;
