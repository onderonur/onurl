import classNames from 'classnames';

type PaperProps = React.PropsWithChildren<{
  className?: string;
}>;

export function Paper({ className, children }: PaperProps) {
  return (
    <div
      className={classNames(
        'rounded-md border border-border-300 bg-white p-5',
        className,
      )}
    >
      {children}
    </div>
  );
}
