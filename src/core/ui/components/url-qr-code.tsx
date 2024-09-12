import { APP_TITLE } from '@/core/core.utils';
import { Button } from '@/core/ui/components/button';
import { saveAs } from 'file-saver';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { AiOutlineCloudDownload } from 'react-icons/ai';

const qrCodeId = 'qrCode';

const handleSaveQrCode = () => {
  // TODO: Will fix these
  // eslint-disable-next-line unicorn/prefer-query-selector
  const canvasContainer = document.getElementById(qrCodeId) as HTMLDivElement;
  // eslint-disable-next-line unicorn/prefer-query-selector
  const canvas = canvasContainer.getElementsByTagName('canvas').item(0);

  if (!canvas) {
    return;
  }

  const png = canvas.toDataURL();
  saveAs(png, `${APP_TITLE}-QRCode-${Date.now()}`);
};

type UrlQrCodeProps = {
  url: string;
  size: number;
};

export function UrlQrCode({ url, size }: UrlQrCodeProps) {
  return (
    <>
      <QRCodeSVG className="h-full w-full" value={url} />
      {/* 
        This hidden qr code is just used to download it easily.
        Converting the svg to png or jpeg and then downloading didn't work for now. 
      */}
      <div id={qrCodeId} hidden>
        <QRCodeCanvas value={url} size={size * 2} />
      </div>
      <Button
        className="mt-1 w-full"
        startIcon={<AiOutlineCloudDownload />}
        onClick={handleSaveQrCode}
      >
        Save
      </Button>
    </>
  );
}
