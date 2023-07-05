import classNames from 'classnames';

type PaperProps = React.PropsWithChildren<{
  className?: string;
}>;

export default function Paper({ className, children }: PaperProps) {
  return (
    <div
      className={classNames(
        'bg-white rounded-md p-5 border border-border-300',
        className,
      )}
    >
      {children}
    </div>
  );
}
