import React from 'react';
import {
  Button,
  CircularProgress,
  ButtonProps,
  ButtonTypeMap,
  styled,
} from '@mui/material';

type BaseButtonProps<
  T extends React.ElementType = ButtonTypeMap['defaultComponent'],
> = ButtonProps<T, { component?: T }> & {
  loading?: boolean;
};

const loadingSize = 24;

const ButtonLoading = styled(CircularProgress)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: `-${loadingSize / 2}px`,
  marginLeft: `-${loadingSize / 2}px`,
});

// https://material-ui.com/guides/typescript/#usage-of-component-prop
const BaseButton = React.forwardRef(function BaseButton<
  T extends React.ElementType,
>(
  {
    loading,
    disabled,
    disableElevation = true,
    children,
    onClick,
    ...rest
  }: BaseButtonProps<T>,
  ref: React.ForwardedRef<React.ComponentRef<typeof Button>>,
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
});

export default BaseButton;
