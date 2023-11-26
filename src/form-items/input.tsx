import classNames from 'classnames';
import { forwardRef } from 'react';
import { useFormControl } from './form-control';

type InputProps = React.ComponentProps<'input'>;

export const Input = forwardRef<React.ElementRef<'input'>, InputProps>(
  function Input({ className, ...rest }, ref) {
    const { ids, errorMessages } = useFormControl();
    const isInvalid = !!errorMessages?.length;

    return (
      <input
        ref={ref}
        id={ids.input}
        className={classNames(
          className,
          'w-full rounded-md p-2 shadow-md',
          isInvalid && 'outline [&:not(:focus)]:outline-error-600',
        )}
        aria-invalid={isInvalid}
        aria-describedby={ids.message}
        {...rest}
      />
    );
  },
);
