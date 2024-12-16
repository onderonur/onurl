import { wait } from '@/core/shared/utils';
import { Button } from '@/core/ui/components/button';
import { useTransition } from 'react';
import type { Props } from 'react-copy-to-clipboard';
import CopyToClipboard from 'react-copy-to-clipboard';
import { AiOutlineCheck, AiOutlineCopy } from 'react-icons/ai';

type CopyToClipboardButtonProps = Pick<Props, 'text'>;

export function CopyToClipboardButton({ text }: CopyToClipboardButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <CopyToClipboard
      text={text}
      onCopy={() => {
        startTransition(async () => {
          await wait(2);
        });
      }}
    >
      <Button className="ml-1" size="small" variant="outline">
        {isPending ? (
          <>
            <AiOutlineCheck />
            Copied
          </>
        ) : (
          <>
            <AiOutlineCopy />
            Copy
          </>
        )}
      </Button>
    </CopyToClipboard>
  );
}
