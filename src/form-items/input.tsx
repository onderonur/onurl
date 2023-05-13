import React from 'react';
import classNames from 'classnames';
import { useFormControl } from './form-control-context';

type InputProps = React.ComponentProps<'input'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...rest },
  ref,
) {
  const { ids, isInvalid } = useFormControl();

  return (
    <input
      ref={ref}
      id={ids.input}
      className={classNames(
        className,
        'w-full p-2 rounded-sm border border-background-300',
        isInvalid && 'outline [&:not(:focus)]:outline-error-600',
      )}
      aria-invalid={isInvalid}
      aria-describedby={ids.message}
      {...rest}
    />
  );
});

export default Input;
