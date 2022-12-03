import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {
    // Loading
  } else if (!data?.me) {
    // User not logged in
    body = (
      <>
        <NextLink href="/login">
          <Button variant={"link"} color="white" mr={2}>
            login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button variant={"link"} color="white">
            register
          </Button>
        </NextLink>
      </>
    );
  } else {
    // User logged in
    body = (
      <>
        <Flex>
          <Box mr={2}>{data.me.username}</Box>
          <Button variant={"link"}>logout</Button>
        </Flex>
      </>
    );
  }

  return (
    <Flex bg="tomato" p={4} ml={"auto"}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
