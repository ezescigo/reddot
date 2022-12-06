import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useCreatePostMutation } from "../generated/graphql";

export const CreatePost: React.FC<{}> = ({}) => {
  const [, createPost] = useCreatePostMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await createPost({ input: values });
          if (response.data?.createPost) {
            // setErrors(toErrorMap(response.data.login.errors));
            // } else if (response.data?.login.user) {
            //   // User created
            //   router.push("/");
          }
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
              <InputField name="text" placeholder="write here!" label="Text" />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              color={"teal.800"}
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
