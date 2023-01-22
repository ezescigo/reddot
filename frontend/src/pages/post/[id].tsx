import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { PostCard } from "../../components/PostCard";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface PostProps {
  // id: number;
}

const Post: React.FC<PostProps> = () => {
  const router = useRouter();
  const id =
    typeof router.query.id === "string" ? parseInt(router.query!.id!) : 0;
  const [{ data, fetching, error }] = usePostQuery({
    pause: id === 0,
    variables: { id },
  });

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
      <PostCard key={id} post={data.post} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
