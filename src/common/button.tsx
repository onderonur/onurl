import classNames from 'classnames';
import Loading from './loading';

type ButtonProps = React.ComponentProps<'button'> & {
  size?: 'default' | 'small';
  variant?: 'solid' | 'outlined';
  isLoading?: boolean;
  startIcon?: React.ReactNode;
};

export default function Button({
  className,
  type = 'button',
  size = 'default',
  variant = 'solid',
  isLoading,
  disabled,
  startIcon,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(
        className,
        'relative inline-flex items-center justify-center rounded-md font-semibold transition-colors',
        variant === 'solid'
          ? 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800'
          : 'bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100',
        'disabled:bg-disabled-300 disabled:text-disabled-400',
        size === 'small' ? 'px-2 py-1 text-sm gap-1' : 'px-4 py-2 gap-2',
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {startIcon ? (
        <span className="bg-slate-50 relative">{startIcon}</span>
      ) : null}
      {children}
      {isLoading ? (
        <Loading
          className="absolute inset-0"
          iconClassName={classNames(
            size === 'default' && 'h-8 w-8',
            size === 'small' && 'h-4 w-4',
          )}
        />
      ) : null}
    </button>
  );
}
