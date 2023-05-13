import classNames from 'classnames';
import { AiOutlineWarning, AiOutlineCheckCircle } from 'react-icons/ai';

type AlertProps = {
  type: 'success' | 'error';
  message: string;
};

export default function Alert({ type, message }: AlertProps) {
  return (
    <div
      className={classNames(
        'p-4 rounded-sm font-semibold flex gap-3 items-center',
        type === 'success' && 'bg-success-100 text-success-700',
        type === 'error' && 'bg-error-100 text-error-700',
      )}
    >
      {type === 'success' ? (
        <AiOutlineCheckCircle className="h-6 w-6" />
      ) : (
        <AiOutlineWarning className="h-6 w-6" />
      )}
      {message}
    </div>
  );
}
