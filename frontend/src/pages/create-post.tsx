import { Box, Button } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { withUrqlClient } from "next-urql"
import { useRouter } from "next/router"
import React from "react"
import { InputField } from "../components/InputField"
import { Layout } from "../app/layout"
import { useCreatePostMutation } from "../generated/graphql"
import { createUrqlClient } from "../utils/createUrqlClient"
import { useIsAuth } from "../utils/useIsAuth"

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter()
  useIsAuth()
  const [, createPost] = useCreatePostMutation()

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          console.log(values)
          const { error } = await createPost({ input: values })
          if (!error) {
            router.push("/")
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Post Title" label="Post Title" />
            <Box mt={4}>
              <InputField name="text" placeholder="write here!" label="Text" textArea />
            </Box>
            <Button mt={4} type="submit" isLoading={isSubmitting} color={"teal.800"}>
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(CreatePost)
