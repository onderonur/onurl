import React, { useEffect, useRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField, FieldHookConfig } from 'formik';

type BaseTextFieldProps = TextFieldProps &
  FieldHookConfig<TextFieldProps['value']>;

function BaseTextField({ variant, autoFocus, ...rest }: BaseTextFieldProps) {
  const [field, meta] = useField(rest);
  const { error, touched } = meta;
  const hasError = Boolean(error && touched);
  const errorMessage = hasError ? error : undefined;

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
      {...field}
      variant={variant ?? 'outlined'}
      inputRef={inputRef}
      // To be able to set the value as "undefined"
      // or "null" in Formik etc
      value={field.value ?? ''}
      fullWidth
      error={hasError}
      helperText={errorMessage}
    />
  );
}

export default BaseTextField;
