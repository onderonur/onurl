import Button from '@/common/button';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      Submit
    </Button>
  );
}
