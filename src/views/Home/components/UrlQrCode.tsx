import React from 'react';
import { Button, Box } from '@chakra-ui/core';
import QRCode from 'qrcode.react';
import styled from '@emotion/styled';
import { saveAs } from 'file-saver';

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
      <Button
        leftIcon="download"
        variantColor="pink"
        width="100%"
        onClick={handleSaveQrCode}
      >
        Save
      </Button>
    </>
  );
});

export default UrlQrCode;
