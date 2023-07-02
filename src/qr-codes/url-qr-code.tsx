import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { saveAs } from 'file-saver';
import { APP_TITLE } from '@/common/common-utils';
import Button from '@/common/button';
import { AiOutlineCloudDownload } from 'react-icons/ai';

const qrCodeId = 'qrCode';

const handleSaveQrCode = async () => {
  const canvasContainer = document.getElementById(qrCodeId) as HTMLDivElement;
  // eslint-disable-next-line prefer-destructuring
  const canvas = canvasContainer.getElementsByTagName('canvas')[0];
  const png = canvas?.toDataURL();
  saveAs(png, `${APP_TITLE}-QRCode-${Date.now()}`);
};

type UrlQrCodeProps = {
  url: string;
  size: number;
};

export default function UrlQrCode({ url, size }: UrlQrCodeProps) {
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
        className="w-full mt-1"
        startIcon={<AiOutlineCloudDownload />}
        onClick={handleSaveQrCode}
      >
        Save
      </Button>
    </>
  );
}
