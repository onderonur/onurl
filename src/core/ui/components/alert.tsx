import { AiOutlineCheckCircle, AiOutlineWarning } from 'react-icons/ai';
import { twJoin } from 'tailwind-merge';

const IconsByType = {
  success: AiOutlineCheckCircle,
  error: AiOutlineWarning,
};

type AlertProps = {
  type: 'success' | 'error';
  message: string;
};

export function Alert({ type, message }: AlertProps) {
  const IconComponent = IconsByType[type];

  return (
    <div
      className={twJoin(
        'flex items-center gap-3 rounded-xs p-4 font-semibold',
        type === 'success'
          ? 'bg-success text-success-foreground'
          : 'bg-error text-error-foreground',
      )}
    >
      <IconComponent className="size-6 flex-none" />
      {message}
    </div>
  );
}
