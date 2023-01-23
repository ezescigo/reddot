import {
  Box,
  Button,
  Flex,
  Heading,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data }] = useMeQuery();

  return (
    <Flex position="sticky" top={0} zIndex={1} bg="tomato" p={4} ml={"auto"}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <ChakraLink href="/">
          <Heading>Reddot</Heading>
        </ChakraLink>
        <Flex ml="auto" align={"center"}>
          <Box ml="auto" mr={2}>
            <Link href="/create-post">
              <Button colorScheme="purple">Create Post</Button>
            </Link>
          </Box>
          {!data?.me ? (
            <>
              <Box mr={2}>
                <ChakraLink href="/login">login</ChakraLink>
              </Box>
              <Box>
                <ChakraLink href="/register">register</ChakraLink>
              </Box>
            </>
          ) : (
            <>
              <Box mr={2}>{data?.me?.username}</Box>
              <Button
                onClick={() => {
                  logout({});
                }}
                isLoading={logoutFetching}
                variant={"link"}
              >
                logout
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
