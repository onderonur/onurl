import React from 'react';
import { useEffect, useRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type BaseTextFieldProps = TextFieldProps;

const BaseTextField = React.forwardRef<
  React.ComponentRef<typeof TextField>,
  BaseTextFieldProps
>(function BaseTextField({ variant, autoFocus, ...rest }, ref) {
  const inputRef = useRef<HTMLInputElement>();

  // To make autoFocus work with Next.js
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <TextField
      ref={ref}
      {...rest}
      variant={variant ?? 'outlined'}
      inputRef={inputRef}
      fullWidth
    />
  );
});

export default BaseTextField;
