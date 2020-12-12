import { Box, BoxProps } from '@material-ui/core';
import styled from 'styled-components';

type SpacerProps = BoxProps & {
  spacing: number;
  // To make it a required prop
  flexDirection: BoxProps['flexDirection'];
};

const Spacer = styled(Box)<SpacerProps>`
  display: flex;
  align-items: ${({ alignItems, flexDirection }) =>
    alignItems ?? flexDirection === 'row' ? 'center' : undefined};
  > *:not(:last-child) {
    ${({ flexDirection, theme, spacing }) =>
      flexDirection === 'row'
        ? `
            margin-right: ${theme.spacing(spacing)}px;
          `
        : `
            margin-bottom: ${theme.spacing(spacing)}px;
          `}
  }
`;

export default Spacer;
