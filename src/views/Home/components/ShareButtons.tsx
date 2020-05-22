import React, { useMemo } from 'react';
import { useTheme, Stack, Box } from '@chakra-ui/core';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TumblrShareButton,
  TumblrIcon,
} from 'react-share';
import ShareButtonTooltip from './ShareButtonTooltip';
import { Maybe } from '@/types';

interface ShareButtonsProps {
  url: Maybe<string>;
}

const ShareButtons = React.memo<ShareButtonsProps>(({ url }) => {
  const shareButtonProps = useMemo(
    () => ({
      url: url || '',
    }),
    [url],
  );

  const theme = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shareIconSize = theme.fontSizes['5xl'] as any;

  const shareIconProps = useMemo(() => ({ size: shareIconSize, round: true }), [
    shareIconSize,
  ]);

  if (!url) {
    return null;
  }

  return (
    <Stack spacing={2} direction="row" flexWrap="wrap" justify="center">
      <Box>
        <ShareButtonTooltip name="Facebook">
          <FacebookShareButton {...shareButtonProps}>
            <FacebookIcon {...shareIconProps} />
          </FacebookShareButton>
        </ShareButtonTooltip>
      </Box>
      <Box>
        <ShareButtonTooltip name="Twitter">
          <TwitterShareButton {...shareButtonProps}>
            <TwitterIcon {...shareIconProps} />
          </TwitterShareButton>
        </ShareButtonTooltip>
      </Box>
      <Box>
        <ShareButtonTooltip name="Reddit">
          <RedditShareButton {...shareButtonProps}>
            <RedditIcon {...shareIconProps} />
          </RedditShareButton>
        </ShareButtonTooltip>
      </Box>
      <Box>
        <ShareButtonTooltip name="Tumblr">
          <TumblrShareButton {...shareButtonProps}>
            <TumblrIcon {...shareIconProps} />
          </TumblrShareButton>
        </ShareButtonTooltip>
      </Box>
      <Box>
        <ShareButtonTooltip name="Linkedin">
          <LinkedinShareButton {...shareButtonProps}>
            <LinkedinIcon {...shareIconProps} />
          </LinkedinShareButton>
        </ShareButtonTooltip>
      </Box>
      <Box>
        <EmailShareButton {...shareButtonProps}>
          <EmailIcon {...shareIconProps} />
        </EmailShareButton>
      </Box>
    </Stack>
  );
});

export default ShareButtons;
