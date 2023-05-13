import { useCallback, useMemo } from 'react';
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
import { Maybe } from '@/common/common-types';

type ShareButtonsProps = {
  url: Maybe<string>;
};

export default function ShareButtons({ url }: ShareButtonsProps) {
  const shareIconSize = '3.2rem';

  const shareIconProps = useMemo(
    () => ({ size: shareIconSize, round: true }),
    [shareIconSize],
  );

  const getShareButtonProps = useCallback(
    (name: string) => {
      return {
        'aria-label': `Share on ${name}`,
        url: url || '',
      };
    },
    [url],
  );

  if (!url) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <FacebookShareButton {...getShareButtonProps('Facebook')}>
        <FacebookIcon {...shareIconProps} />
      </FacebookShareButton>
      <TwitterShareButton {...getShareButtonProps('Twitter')}>
        <TwitterIcon {...shareIconProps} />
      </TwitterShareButton>
      <RedditShareButton {...getShareButtonProps('Reddit')}>
        <RedditIcon {...shareIconProps} />
      </RedditShareButton>
      <TumblrShareButton {...getShareButtonProps('Tumblr')}>
        <TumblrIcon {...shareIconProps} />
      </TumblrShareButton>
      <LinkedinShareButton {...getShareButtonProps('LinkedIn')}>
        <LinkedinIcon {...shareIconProps} />
      </LinkedinShareButton>
      <MailruShareButton {...getShareButtonProps('Mail.Ru')}>
        <MailruIcon {...shareIconProps} />
      </MailruShareButton>
      <EmailShareButton {...getShareButtonProps('E-mail')}>
        <EmailIcon {...shareIconProps} />
      </EmailShareButton>
    </div>
  );
}
