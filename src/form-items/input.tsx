import classNames from 'classnames';
import { useFormControl } from './form-control-context';
import { forwardRef } from 'react';

type InputProps = React.ComponentProps<'input'>;

const Input = forwardRef<React.ElementRef<'input'>, InputProps>(function Input(
  { className, ...rest },
  ref,
) {
  const { ids, errorMessages } = useFormControl();
  const isInvalid = !!errorMessages?.length;

  return (
    <input
      ref={ref}
      id={ids.input}
      className={classNames(
        className,
        'w-full p-2 rounded-md shadow-md',
        isInvalid && 'outline [&:not(:focus)]:outline-error-600',
      )}
      aria-invalid={isInvalid}
      aria-describedby={ids.message}
      {...rest}
    />
  );
});

export default Input;
