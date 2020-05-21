import React from 'react';
import { NextPage } from 'next';
import { Spinner, Flex, Alert, AlertTitle, AlertIcon } from '@chakra-ui/core';

interface AliasViewProps {
  error?: string;
}

const AliasView: NextPage<AliasViewProps> = ({ error }) => {
  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{error}</AlertTitle>
      </Alert>
    );
  }

  return (
    <Flex justifyContent="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    </Flex>
  );
};

export default AliasView;
