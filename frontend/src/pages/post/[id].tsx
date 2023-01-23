import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { PostItem } from "../../components/PostItem";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromURL } from "../../utils/useGetPostFromURL";

interface PostProps {
  // id: number;
}

const Post: React.FC<PostProps> = () => {
  const [{ data, fetching, error }] = useGetPostFromURL();

  console.log(data);

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
    <Layout>
      <PostItem key={data.post.id} post={data.post} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
