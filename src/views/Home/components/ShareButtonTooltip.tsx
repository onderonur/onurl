import { Tooltip } from '@material-ui/core';
import React from 'react';

interface ShareButtonTooltipProps {
  name: string;
  children: React.ReactElement;
}

const ShareButtonTooltip = React.memo<ShareButtonTooltipProps>(
  ({ name, children }) => {
    const label = `Share on ${name}`;
    return (
      <Tooltip title={label} aria-label={label}>
        {children}
      </Tooltip>
    );
  },
);

export default ShareButtonTooltip;
