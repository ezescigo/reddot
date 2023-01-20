import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import { PostCard } from "../components/PostCard";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface Variables {
  limit: number;
  cursor: string | null;
}

const Index = () => {
  const [variables, setVariables] = useState<Variables>({
    limit: 15,
    cursor: null,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>There's been an error loading posts.</div>;
  }

  return (
    <Layout>
      <Flex mb={4}>
        <Heading>Reddot</Heading>
        <Box ml="auto">
          <NextLink href="/create-post">
            <Button colorScheme="purple">Create Post</Button>
          </NextLink>
        </Box>
      </Flex>
      <Stack spacing={8} direction="column">
        {!data && fetching
          ? null
          : data!.posts.posts.map((p) => (
              <PostCard
                key={p.id}
                post={p}
                // title={p.title}
                // creator={p.creator}
                // upvotes={p.points}
                // desc={`${p.textSnippet}...`}
              />
            ))}
      </Stack>
      <Flex>
        {data ? (
          <Button
            m="auto"
            my={8}
            isLoading={fetching}
            disabled={!data?.posts.hasMore}
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
          >
            {data.posts.hasMore ? "Load more" : "You are up to date!"}
          </Button>
        ) : null}
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
