import { FieldError } from 'react-hook-form';
import { useFormControl } from './FormControlContext';

type FormErrorMessageProps = {
  error?: FieldError;
};

export default function FormErrorMessage({ error }: FormErrorMessageProps) {
  const { ids, isInvalid } = useFormControl();

  if (!isInvalid || !error) {
    return null;
  }

  // Şuradan aria attribute'larına ve html tag'lerine falan bak.
  // Genel olarak form item'lara uygula.
  // https://chakra-ui.com/docs/components/form-control#improvements-from-v1
  return (
    <div id={ids.message} className="text-error-600" aria-live="polite">
      {error.message}
    </div>
  );
}
