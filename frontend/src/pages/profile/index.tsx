import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react"
import { withUrqlClient } from "next-urql"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { Layout } from "../../app/layout"
import { useEditProfileMutation, useLoginMutation, useMeQuery } from "../../generated/graphql"
import { createUrqlClient } from "../../utils/createUrqlClient"
import {
  IconBuildingSkyscraper,
  IconClockHour2,
  IconLink,
  IconMapPin,
  IconUsersGroup,
} from "@tabler/icons-react"
import { convertTimestamp } from "../../utils/parseDate"
import { Form, Formik } from "formik"
import { InputField } from "../../components/InputField"

const Profile: React.FC<{}> = ({}) => {
  // const [{}, login] = useLoginMutation()
  const [{}, editProfile] = useEditProfileMutation()
  const router = useRouter()
  const [{ data }] = useMeQuery()
  const [editMode, setEditMode] = useState<boolean>(false)

  const dateTime = new Date()

  console.log(data)

  const handleClickEdit = () => {
    setEditMode(true)
  }

  const handleClickCancel = () => {
    setEditMode(false)
  }

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
            {editMode ? (
              <Formik
                initialValues={{
                  name: data?.me?.name ?? "",
                  description: data?.me?.description ?? "",
                  pronouns: "",
                  company: data?.me?.company ?? "",
                  location: data?.me?.location ?? "",
                  website: data?.me?.website ?? "",
                  socialProfile1: data?.me?.socialProfile1 ?? "",
                  socialProfile2: data?.me?.socialProfile2 ?? "",
                  socialProfile3: data?.me?.socialProfile3 ?? "",
                  socialProfile4: data?.me?.socialProfile4 ?? "",
                  socialProfile5: data?.me?.socialProfile5 ?? "",
                }}
                onSubmit={async (values) => {
                  console.log(values)
                  if (data?.me?.id) {
                    const { data: editProfileResponse } = await editProfile({
                      options: { ...values, id: data?.me?.id },
                    })
                    console.log(editProfileResponse)
                  }
                  setEditMode(false)

                  // const { error } = await createPost({ input: values })
                  // if (!error) {
                  //   router.push("/")
                  // }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Grid gap={4}>
                      <InputField name="name" placeholder="Name" label="Name" />
                      <InputField
                        name="description"
                        placeholder="Tell us something about you"
                        label="Bio"
                        textArea
                      />
                      <GridItem>
                        <FormLabel htmlFor="pronouns">Pronouns</FormLabel>
                        <Select placeholder="Select option">
                          <option value="na">Don't specify</option>
                          <option value="they">they/them</option>
                          <option value="she">she/her</option>
                          <option value="he">he/him</option>
                        </Select>
                      </GridItem>
                      <HStack>
                        <IconBuildingSkyscraper />
                        <InputField name="company" placeholder="Company" />
                      </HStack>
                      <HStack>
                        <IconLink />
                        <InputField name="website" placeholder="Website" />
                      </HStack>
                      <HStack>
                        <IconMapPin />
                        <InputField name="location" placeholder="Location" />
                      </HStack>
                      <GridItem>
                        <HStack marginBottom={2}>
                          <IconClockHour2 />
                          <Checkbox defaultChecked>Display current local time</Checkbox>
                        </HStack>
                        <Select>
                          <option value="1">GMT +01:00 Amsterdam</option>
                          <option value="2">GMT +01:00 Berlin</option>
                        </Select>
                      </GridItem>
                      <GridItem>
                        <FormLabel marginBottom={2} htmlFor="social-profiles">
                          Social accounts
                        </FormLabel>
                        <HStack>
                          <IconLink />
                          <InputField name="socialProfile1" placeholder="Link to social profile" />
                        </HStack>
                      </GridItem>
                      <GridItem>
                        <HStack>
                          <IconLink />
                          <InputField name="socialProfile2" placeholder="Link to social profile" />
                        </HStack>
                      </GridItem>
                      <GridItem>
                        <HStack>
                          <IconLink />
                          <InputField name="socialProfile3" placeholder="Link to social profile" />
                        </HStack>
                      </GridItem>
                      <GridItem>
                        <HStack>
                          <IconLink />
                          <InputField name="socialProfile4" placeholder="Link to social profile" />
                        </HStack>
                      </GridItem>
                      <GridItem>
                        <HStack>
                          <IconLink />
                          <InputField name="socialProfile5" placeholder="Link to social profile" />
                        </HStack>
                      </GridItem>
                    </Grid>

                    <HStack justifyContent={"flex-end"}>
                      <Button
                        mt={4}
                        disabled={isSubmitting}
                        color={"gray.400"}
                        onClick={handleClickCancel}
                        variant={"outline"}
                      >
                        Cancel
                      </Button>
                      <Button
                        mt={4}
                        type="submit"
                        isLoading={isSubmitting}
                        color={"orange.400"}
                        // variant={"outline"}
                      >
                        Save
                      </Button>
                    </HStack>
                  </Form>
                )}
              </Formik>
            ) : (
              <>
                <GridItem>
                  <Text fontSize={"3xl"} fontWeight="bold">
                    {data?.me?.name}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={"larger"} color="gray.500">
                    {data?.me?.username}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={"larger"} color="gray.500">
                    {data?.me?.email}
                  </Text>
                </GridItem>
                <GridItem marginTop="4">
                  <Text fontSize={"larger"}>{data?.me?.description}</Text>
                </GridItem>
                <GridItem marginY="4" w="full">
                  <Button w="100%" onClick={handleClickEdit}>
                    Edit profile
                  </Button>
                </GridItem>
                <GridItem>
                  <HStack>
                    <IconUsersGroup />
                    <Text fontWeight={"bold"}>0</Text>
                    <Text color="gray.500">followers</Text>
                    <Text color="gray.500">·</Text>
                    <Text fontWeight={"bold"}>0</Text>
                    <Text color="gray.500">following</Text>
                  </HStack>
                </GridItem>
                {data?.me?.company && (
                  <GridItem marginTop="2">
                    <HStack>
                      <IconBuildingSkyscraper />
                      <Text>{data.me.company}</Text>
                    </HStack>
                  </GridItem>
                )}
                {data?.me?.location && (
                  <GridItem marginTop="2">
                    <HStack>
                      <IconMapPin />
                      <Text>{data.me.location}</Text>
                    </HStack>
                  </GridItem>
                )}
                <GridItem marginTop="2">
                  <HStack>
                    <IconClockHour2 />
                    <Text>{dateTime.toLocaleTimeString()}</Text>
                    {/* <Text>{dateTime.getTimezoneOffset() / -60}</Text> */}
                  </HStack>
                </GridItem>
                {data?.me?.website && (
                  <GridItem marginTop="2">
                    <HStack>
                      <IconLink />
                      <Text>{data.me.website}</Text>
                    </HStack>
                  </GridItem>
                )}
                {data?.me?.socialProfile1 && (
                  <GridItem marginTop="2">
                    <HStack>
                      <IconLink />
                      <Text>{data.me.socialProfile1}</Text>
                    </HStack>
                  </GridItem>
                )}
                {data?.me?.socialProfile2 && (
                  <GridItem marginTop="2">
                    <HStack>
                      <IconLink />
                      <Text>{data.me.socialProfile1}</Text>
                    </HStack>
                  </GridItem>
                )}
                {data?.me?.socialProfile3 && (
                  <GridItem marginTop="2">
                    <HStack>
                      <IconLink />
                      <Text>{data.me.socialProfile1}</Text>
                    </HStack>
                  </GridItem>
                )}
                {data?.me?.socialProfile4 && (
                  <GridItem marginTop="2">
                    <HStack>
                      <IconLink />
                      <Text>{data.me.socialProfile1}</Text>
                    </HStack>
                  </GridItem>
                )}
                {data?.me?.socialProfile5 && (
                  <GridItem marginTop="2">
                    <HStack>
                      <IconLink />
                      <Text>{data.me.socialProfile1}</Text>
                    </HStack>
                  </GridItem>
                )}

                <GridItem marginTop="4">
                  <Text fontSize={"larger"} color="gray.500">
                    {data?.me?.createdAt
                      ? `Member since ${new Date(+data.me.createdAt).toLocaleDateString("en-DE")}`
                      : null}
                  </Text>
                </GridItem>
              </>
            )}
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
