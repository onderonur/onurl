import React from 'react';
import { Box, Divider, Link, Flex, Stack } from '@chakra-ui/core';
import NextLink from 'next/link';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Layout: React.FC = ({ children }) => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Flex
        as="header"
        paddingY={3}
        paddingX={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <NextLink href="/">
          <Link
            fontSize="2xl"
            fontWeight="bold"
            color="purple.600"
            _hover={{ textDecoration: 'none' }}
          >
            OnURL
          </Link>
        </NextLink>
        <Link href="https://github.com/onderonur/onurl" isExternal>
          <Box as={FaGithub} fontSize="3xl" />
        </Link>
      </Flex>
      <Divider marginY={0} />
      <Box
        as="main"
        width="100%"
        maxWidth={800}
        marginX="auto"
        marginY="1rem"
        padding={4}
        flex={1}
      >
        {children}
      </Box>
      <Divider marginY={0} />
      <Flex padding={4} justifyContent="flex-end" as="footer">
        <Stack direction="row" spacing={6}>
          <Link href="https://linkedin.com/in/onderonur" isExternal>
            <Box as={FaLinkedin} fontSize="xl" />
          </Link>
          <Link href="https://twitter.com/onderonur_" isExternal>
            <Box as={FaTwitter} fontSize="xl" />
          </Link>
          <Link href="https://github.com/onderonur" isExternal>
            <Box as={FaGithub} fontSize="xl" />
          </Link>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Layout;
