import type { Maybe } from '@/core/shared/shared.types';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  MailruIcon,
  MailruShareButton,
  RedditIcon,
  RedditShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

type ShareButtonsProps = {
  url: Maybe<string>;
};

export function ShareButtons({ url }: ShareButtonsProps) {
  const shareIconSize = '3.2rem';

  const shareIconProps = { size: shareIconSize, round: true };

  function getShareButtonProps(name: string) {
    return {
      'aria-label': `Share on ${name}`,
      url: url || '',
    };
  }

  if (!url) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
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
