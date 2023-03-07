import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Link,
  styled,
  Toolbar,
} from '@mui/material';
import ExternalLink from '../common/ExternalLink';
import NextLink from 'next/link';
import { Bold } from '../common/StyleUtils';
import GitHubIcon from '@mui/icons-material//GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Stack } from '@mui/material';
import { APP_TITLE } from '@/common/CommonUtils';

const TitleLink = styled(Link)({
  '&:hover': {
    textDecoration: 'none',
  },
});

const MainContent = styled('main')(({ theme }) => ({
  flex: 1,
  margin: '0 auto',
  maxWidth: '800px',
  width: '100%',
  padding: theme.spacing(4),
}));

type LayoutProps = React.PropsWithChildren;

function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        variant="outlined"
        elevation={0}
        position="relative"
        color="inherit"
      >
        <Toolbar>
          <TitleLink variant="h6" color="primary" as={NextLink} href="/">
            <Bold>{APP_TITLE}</Bold>
          </TitleLink>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            component={ExternalLink}
            href="https://github.com/onderonur/onurl"
            aria-label="Check the source code on GitHub"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MainContent>
        <>{children}</>
      </MainContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          padding: 1,
          justifyContent: 'flex-end',
        }}
        component="footer"
      >
        <Stack direction="row" spacing={1}>
          <IconButton
            component={ExternalLink}
            href="https://linkedin.com/in/onderonur"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            component={ExternalLink}
            href="https://twitter.com/onderonur_"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            component={ExternalLink}
            href="https://github.com/onderonur"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}

export default Layout;
