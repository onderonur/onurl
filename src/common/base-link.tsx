import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export type BaseLinkProps = React.ComponentProps<typeof Link>;

export function BaseLink({ className, ...rest }: BaseLinkProps) {
  return (
    <Link
      className={twMerge(
        'text-primary-600 hover:text-primary-700 active:text-primary-800',
        className,
      )}
      {...rest}
    />
  );
}
