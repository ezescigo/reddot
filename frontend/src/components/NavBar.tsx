import {
  Box,
  Button,
  Flex,
  Heading,
  Link as ChakraLink,
  useDisclosure,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import React, { useState } from "react"
import { useLogoutMutation, useMeQuery } from "../generated/graphql"
import { useRouter } from "next/router"
import { DarkModeSwitch } from "./DarkModeSwitch"
import { UserMenu } from "./UserMenu"

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data }] = useMeQuery()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex position="sticky" top={0} zIndex={1} bg="tomato" p={4} ml={"auto"}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <Flex position="fixed" left={4}>
          <ChakraLink href="/">
            <Heading>R.</Heading>
          </ChakraLink>
        </Flex>
        <Flex ml="auto" align={"center"}>
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
              <Button variant={"unstyled"} onClick={onOpen} mr={2}>
                {data?.me?.username}
              </Button>
              <UserMenu user={data} isOpen={isOpen} onCloseDrawer={onClose} />
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
