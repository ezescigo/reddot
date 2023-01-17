import React from "react";
import { Box, Button, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data }] = useMeQuery({
    pause: isServer(), //
  });

  console.log("data", data);

  return (
    <Flex position="sticky" top={0} zIndex={1} bg="tomato" p={4} ml={"auto"}>
      <Box ml={"auto"}>
        {!data?.me ? (
          <>
            <ChakraLink href="/login">login</ChakraLink>
            <ChakraLink href="/register">register</ChakraLink>
          </>
        ) : (
          <>
            <Flex>
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
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  );
};
