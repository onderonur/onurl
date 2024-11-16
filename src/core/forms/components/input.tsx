import { useFormControlContext } from '@/core/forms/components/form-control';
import { twMerge } from 'tailwind-merge';

type InputProps = React.ComponentProps<'input'>;

export function Input({ className, ...rest }: InputProps) {
  const { ids, isRequired, errorMessages } = useFormControlContext();
  const isInvalid = !!errorMessages?.length;

  return (
    <input
      id={ids.input}
      className={twMerge(
        'w-full rounded-md p-2 shadow-md',
        isInvalid && 'outline [&:not(:focus)]:outline-error-600',
        className,
      )}
      aria-invalid={isInvalid}
      aria-describedby={ids.message}
      required={isRequired}
      {...rest}
    />
  );
}
