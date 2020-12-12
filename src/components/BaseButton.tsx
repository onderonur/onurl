import React from 'react';
import {
  Button,
  CircularProgress,
  ButtonProps,
  ButtonTypeMap,
} from '@material-ui/core';
import styled from 'styled-components';

type BaseButtonProps<
  T extends React.ElementType = ButtonTypeMap['defaultComponent']
> = ButtonProps<T, { component?: T }> & {
  loading?: boolean;
};

const loadingSize = 24;

const ButtonLoading = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -${loadingSize / 2}px;
  margin-left: -${loadingSize / 2}px;
`;

type BaseButtonRef = React.ComponentPropsWithRef<typeof Button>['ref'];

// https://material-ui.com/guides/typescript/#usage-of-component-prop
function BaseButton<T extends React.ElementType>(
  {
    loading,
    disabled,
    disableElevation = true,
    children,
    onClick,
    ...rest
  }: BaseButtonProps<T>,
  ref: BaseButtonRef,
) {
  return (
    <Button
      {...rest}
      ref={ref}
      disabled={loading || disabled}
      disableElevation={disableElevation}
      onClick={onClick}
    >
      {children}
      {loading && <ButtonLoading size={loadingSize} />}
    </Button>
  );
}

export default React.forwardRef(BaseButton) as typeof BaseButton;
