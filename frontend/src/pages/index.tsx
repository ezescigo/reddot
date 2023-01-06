import { Box, Stack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 5,
    },
  });
  return (
    <Layout>
      <NextLink href="/create-post">
        <Box>Create Post</Box>
      </NextLink>
      <div>Recent Posts</div>

      <Stack spacing={8} direction="column">
        {!data
          ? null
          : data.posts.map((p) => (
              <Card key={p.id} title={p.title} desc={`${p.textSnippet}...`} />
            ))}
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
