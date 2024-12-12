import type { Maybe } from '@/core/shared/types';
import { Button } from '@/core/ui/components/button';
import { useRef, useState } from 'react';
import type { Props } from 'react-copy-to-clipboard';
import CopyToClipboard from 'react-copy-to-clipboard';
import { AiOutlineCheck, AiOutlineCopy } from 'react-icons/ai';

type CopyToClipboardButtonProps = Pick<Props, 'text'>;

export function CopyToClipboardButton({ text }: CopyToClipboardButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const timerRef = useRef<Maybe<NodeJS.Timeout>>(null);

  return (
    <CopyToClipboard
      text={text}
      onCopy={() => {
        setHasCopied(true);

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setHasCopied(false);
        }, 2000);
      }}
    >
      <Button className="ml-1" size="small" variant="outline">
        {hasCopied ? (
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
