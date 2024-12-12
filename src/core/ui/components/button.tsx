import { Loading } from '@/core/ui/components/loading';
import { cva } from 'class-variance-authority';
import { twJoin, twMerge } from 'tailwind-merge';

const buttonVarians = cva(
  [
    'relative inline-flex items-center justify-center rounded-md font-semibold transition-colors',
    'disabled:bg-disabled-300 disabled:text-disabled-400',
  ],
  {
    variants: {
      variant: {
        solid:
          'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
        outline:
          'border-2 border-primary-600 bg-white text-primary-600 hover:bg-primary-50 active:bg-primary-100',
      },
      size: {
        default: 'gap-2 px-4 py-2',
        small: 'gap-1 px-2 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'default',
    },
  },
);

type ButtonProps = React.ComponentProps<'button'> & {
  size?: 'default' | 'small';
  variant?: 'solid' | 'outline';
  isLoading?: boolean;
};

export function Button({
  className,
  type = 'button',
  size,
  variant,
  isLoading,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={twMerge(
        buttonVarians({
          className,
          variant,
          size,
        }),
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {children}
      {isLoading ? (
        <Loading
          className="absolute inset-0"
          iconClassName={twJoin(size === 'default' ? 'size-8' : 'size-4')}
        />
      ) : null}
    </button>
  );
}
