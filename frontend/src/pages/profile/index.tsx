import { Avatar, Box, Button, Flex, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react"
import { withUrqlClient } from "next-urql"
import { useRouter } from "next/router"
import React from "react"
import { Layout } from "../../app/layout"
import { useLoginMutation } from "../../generated/graphql"
import { createUrqlClient } from "../../utils/createUrqlClient"
import { IconClockHour2, IconLink, IconUsersGroup } from "@tabler/icons-react"

const Profile: React.FC<{}> = ({}) => {
  const [{}, login] = useLoginMutation()
  const router = useRouter()

  const dateTime = new Date()

  return (
    <Layout>
      <Grid
        paddingTop="8"
        templateAreas={`"main preview"`}
        // gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"300px 2fr"}
        columnGap={8}
        // h="400px"
        // gap="1"
      >
        <GridItem flex={1} flexDirection={"column"} area="main">
          <Grid templateRows="repeat(5, 0.05fr)">
            <GridItem>
              <Box w="300px" h="300px" m="0 auto">
                <Avatar size="full"></Avatar>
              </Box>
            </GridItem>
            <GridItem>
              <Text fontSize={"3xl"} fontWeight="bold">
                John Doe
              </Text>
            </GridItem>
            <GridItem>
              <Text fontSize={"larger"} color="gray.500">
                john.dow@aol.com
              </Text>
            </GridItem>
            <GridItem marginTop="4">
              <Text fontSize={"larger"}>phD in Things. Expert in randomness.</Text>
            </GridItem>
            <GridItem marginY="4" w="full">
              <Button w="100%">Edit profile</Button>
            </GridItem>
            <GridItem>
              <HStack>
                <IconUsersGroup />
                <Text fontWeight={"bold"}>1</Text>
                <Text color="gray.500">follower</Text>
                <Text color="gray.500">·</Text>
                <Text fontWeight={"bold"}>7</Text>
                <Text color="gray.500">following</Text>
              </HStack>
            </GridItem>
            <GridItem marginTop="4" marginBottom={"2"}>
              <HStack>
                <IconClockHour2 />
                <Text>{dateTime.toLocaleTimeString()}</Text>
                {/* <Text>{dateTime.getTimezoneOffset() / -60}</Text> */}
              </HStack>
            </GridItem>
            <GridItem>
              <HStack>
                <IconLink />

                <Text>www.DrJohnDoe.com</Text>
              </HStack>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem area="preview">
          <Box border="2px" h="full">
            preview
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(Profile)
