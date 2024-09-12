import { Button } from '@/core/ui/components/button';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      Submit
    </Button>
  );
}
