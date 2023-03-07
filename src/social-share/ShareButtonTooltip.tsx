import { Tooltip, TooltipProps } from '@mui/material';

type ShareButtonTooltipProps = Pick<TooltipProps, 'children'> & {
  name: string;
};

function ShareButtonTooltip({ name, children }: ShareButtonTooltipProps) {
  const label = `Share on ${name}`;
  return (
    <Tooltip title={label} aria-label={label}>
      {children}
    </Tooltip>
  );
}

export default ShareButtonTooltip;
