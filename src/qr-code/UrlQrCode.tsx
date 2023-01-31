import React from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { saveAs } from 'file-saver';
import { Box, styled } from '@mui/material';
import BaseButton from '@/common/BaseButton';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { APP_TITLE } from '@/common/CommonUtils';

const qrCodeId = 'qrCode';

const handleSaveQrCode = async () => {
  const canvasContainer = document.getElementById(qrCodeId) as HTMLDivElement;
  // eslint-disable-next-line prefer-destructuring
  const canvas = canvasContainer.getElementsByTagName('canvas')[0];
  const png = canvas?.toDataURL();
  saveAs(png, `${APP_TITLE}-QRCode-${Date.now}`);
};

const StyledQRCodeSVG = styled(QRCodeSVG)({
  width: '100%',
  height: '100%',
});

interface UrlQrCodeProps {
  url: string;
  size: number;
}

function UrlQrCode({ url, size }: UrlQrCodeProps) {
  return (
    <>
      <StyledQRCodeSVG value={url} />
      {/* 
        This hidden qr code is just used to download it easily.
        Converting the svg to png or jpeg and then downloading didn't work for now. 
      */}
      <Box id={qrCodeId} hidden>
        <QRCodeCanvas value={url} size={size * 2} />
      </Box>
      <BaseButton
        startIcon={<CloudDownloadOutlinedIcon />}
        variant="contained"
        color="secondary"
        onClick={handleSaveQrCode}
        sx={{ width: '100%' }}
      >
        Save
      </BaseButton>
    </>
  );
}

export default UrlQrCode;
