import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetId } from "../../../utils/useGetId";

interface EditPostProps {}

const EditPost: React.FC<EditPostProps> = ({}) => {
  const router = useRouter();
  const postId = useGetId();
  const [{ data, fetching, error }] = usePostQuery({
    variables: { id: postId },
  });
  const [, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return (
      <Layout>
        <Box>loading</Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box>error</Box>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Cannot find post</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          await updatePost({
            updatePostId: postId,
            title: values.title,
            text: values.text,
          });
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="Post Title"
              label="Post Title"
            />
            <Box mt={4}>
              <InputField
                name="text"
                placeholder="write here!"
                label="Text"
                textArea
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              color={"teal.800"}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(EditPost);
