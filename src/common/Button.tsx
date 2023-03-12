import classNames from 'classnames';
import Loading from './Loading';

type ButtonProps = React.ComponentProps<'button'> & {
  size?: 'default' | 'small';
  isLoading?: boolean;
  startIcon?: React.ReactNode;
};

export default function Button({
  className,
  type = 'button',
  size = 'default',
  isLoading,
  disabled,
  startIcon,
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={classNames(
        className,
        'relative flex items-center justify-center font-semibold rounded-sm transition-colors',
        size === 'default'
          ? 'px-4 py-2 gap-2'
          : size === 'small'
          ? 'px-2 py-1 text-sm gap-1'
          : null,
        isDisabled
          ? 'bg-disabled-300 text-disabled-500'
          : 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
      )}
      disabled={isDisabled}
      {...rest}
    >
      {startIcon && (
        <span
          className={classNames(
            size === 'default'
              ? '[&>*]:h-6 [&>*]:w-6'
              : size === 'small'
              ? '[&>*]:h-4 [&>*]:w-4'
              : null,
          )}
        >
          {startIcon}
        </span>
      )}
      {children}
      {isLoading && (
        <Loading
          className="absolute inset-0"
          iconClassName={classNames(
            size === 'default' && 'h-8 w-8',
            size === 'small' && 'h-4 w-4',
          )}
        />
      )}
    </button>
  );
}
