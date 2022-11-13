import React, { useEffect, useRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type BaseTextFieldProps = TextFieldProps;

function BaseTextField({ variant, autoFocus, ...rest }: BaseTextFieldProps) {
  const inputRef = useRef<HTMLInputElement>();

  // To make autoFocus work with Next.js
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <TextField
      {...rest}
      variant={variant ?? 'outlined'}
      inputRef={inputRef}
      fullWidth
    />
  );
}

export default BaseTextField;
