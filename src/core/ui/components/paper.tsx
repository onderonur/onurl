import { twMerge } from 'tailwind-merge';

type PaperProps = {
  className?: string;
  children: React.ReactNode;
};

export function Paper({ className, children }: PaperProps) {
  return (
    <div
      className={twMerge(
        'border-border rounded-md border bg-white p-5',
        className,
      )}
    >
      {children}
    </div>
  );
}
