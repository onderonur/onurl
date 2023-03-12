import Link from 'next/link';
import classNames from 'classnames';

export type BaseLinkProps = React.ComponentProps<typeof Link>;

export default function BaseLink({ className, ...rest }: BaseLinkProps) {
  return (
    <Link
      className={classNames(
        className,
        'text-primary-600 hover:text-primary-700 active:text-primary-800',
      )}
      {...rest}
    />
  );
}
