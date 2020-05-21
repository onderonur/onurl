import React, { useCallback } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Icon,
  InputProps,
} from '@chakra-ui/core';
import { useField, FieldConfig, useFormikContext } from 'formik';

type BaseInputProps = FieldConfig<string> &
  InputProps & {
    label?: string;
    isRequired?: boolean;
    leftIcon?: string;
  };

const BaseInput = React.memo<BaseInputProps>(
  ({ label, isRequired, leftIcon, ...rest }) => {
    const [field, meta] = useField(rest);

    const { name } = field;
    const { error, touched } = meta;

    const { setFieldTouched } = useFormikContext();

    // https://github.com/jaredpalmer/formik/pull/737#issuecomment-402869535
    // Formik sets "touched" on blur event. But we want to show validation
    // errors as user types. So, we set the "touched" manually in the change
    // event.
    const handleChange = useCallback<NonNullable<BaseInputProps['onChange']>>(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { onChange } = field;
        setFieldTouched(name, true);
        onChange(e);
      },
      [field, name, setFieldTouched],
    );

    const input = <Input {...rest} {...field} onChange={handleChange} />;

    return (
      <FormControl isRequired={isRequired} isInvalid={!!(touched && error)}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        {leftIcon ? (
          <InputGroup>
            <InputLeftElement>
              <Icon name={leftIcon} />
            </InputLeftElement>
            {input}
          </InputGroup>
        ) : (
          input
        )}
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    );
  },
);

export default BaseInput;
