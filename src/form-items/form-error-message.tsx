import { useFormControl } from './form-control-context';

type FormErrorMessageProps = {
  messages?: string[];
};

export default function FormErrorMessage({ messages }: FormErrorMessageProps) {
  const { ids, isInvalid } = useFormControl();

  if (!isInvalid || !messages?.length) {
    return null;
  }

  // TODO: Will check example aria attributes and html tags etc.
  // And will apply to all form items.
  // https://chakra-ui.com/docs/components/form-control#improvements-from-v1
  return (
    <div id={ids.message} className="text-error-600" aria-live="polite">
      {messages.join(', ')}
    </div>
  );
}
