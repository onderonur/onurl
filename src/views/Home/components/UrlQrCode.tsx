import React from 'react';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import BaseButton from '@/components/BaseButton';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';

const SaveButton = styled(BaseButton)`
  width: 100%;
` as typeof BaseButton;

const qrCodeId = 'qrCode';

const handleSaveQrCode = async () => {
  const canvas = document.getElementById(qrCodeId) as HTMLCanvasElement;
  const png = canvas?.toDataURL();
  saveAs(png, `OnUrl-QRCode-${Date.now}`);
};

const StyledQRCode = styled(QRCode)`
  display: block;
  height: auto !important;
  width: 100% !important;
`;

interface UrlQrCodeProps {
  url: string;
  size: number;
}

const UrlQrCode = React.memo<UrlQrCodeProps>(function UrlQrCode({ url, size }) {
  return (
    <>
      <StyledQRCode value={url} renderAs="svg" />
      {/* This hidden qr code is just used to download it easily.
                    Converting the svg to png or jpeg and then downloading didn't work for now. */}
      <Box hidden>
        <StyledQRCode id={qrCodeId} value={url} size={size * 2} />
      </Box>
      <SaveButton
        startIcon={<CloudDownloadOutlinedIcon />}
        variant="contained"
        color="secondary"
        onClick={handleSaveQrCode}
      >
        Save
      </SaveButton>
    </>
  );
});

export default UrlQrCode;
