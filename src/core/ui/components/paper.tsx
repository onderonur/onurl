import { twMerge } from 'tailwind-merge';

type PaperProps = {
  className?: string;
  children: React.ReactNode;
};

export function Paper({ className, children }: PaperProps) {
  return (
    <div
      className={twMerge(
        'rounded-md border border-border-300 bg-white p-5',
        className,
      )}
    >
      {children}
    </div>
  );
}
