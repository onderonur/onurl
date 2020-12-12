import React, { useMemo } from 'react';
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
  MailruShareButton,
  MailruIcon,
} from 'react-share';
import ShareButtonTooltip from './ShareButtonTooltip';
import { Maybe } from '@/types';
import { Box } from '@material-ui/core';
import Spacer from '@/components/Spacer';

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

  const shareIconSize = '3.2rem';

  const shareIconProps = useMemo(() => ({ size: shareIconSize, round: true }), [
    shareIconSize,
  ]);

  if (!url) {
    return null;
  }

  return (
    <Spacer
      flexDirection="row"
      spacing={2}
      flexWrap="wrap"
      justifyContent="center"
    >
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
        <ShareButtonTooltip name="Mail.Ru">
          <MailruShareButton {...shareButtonProps}>
            <MailruIcon {...shareIconProps} />
          </MailruShareButton>
        </ShareButtonTooltip>
      </Box>
      <Box>
        <EmailShareButton {...shareButtonProps}>
          <EmailIcon {...shareIconProps} />
        </EmailShareButton>
      </Box>
    </Spacer>
  );
});

export default ShareButtons;
