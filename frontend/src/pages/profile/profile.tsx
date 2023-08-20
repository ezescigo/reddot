import React from "react"
import { Form, Formik } from "formik"
import { Box, Button, Flex } from "@chakra-ui/react"
import Wrapper from "../../components/Wrapper"
import { InputField } from "../../components/InputField"
import { useLoginMutation } from "../../generated/graphql"
import { toErrorMap } from "../../utils/toErrorMap"
import { useRouter } from "next/router"
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "../../utils/createUrqlClient"
import NextLink from "next/link"
import { Layout } from "../../app/layout"

const Profile: React.FC<{}> = ({}) => {
  const [{}, login] = useLoginMutation()
  const router = useRouter()
  return <Layout>profile</Layout>
}

export default withUrqlClient(createUrqlClient)(Profile)
