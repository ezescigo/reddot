import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { Layout } from "../components/Layout";
import NewPost from "../components/NewPost";
import { PostItem } from "../components/PostItem";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
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
  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  });

  const [{ data: meData }] = useMeQuery();

  if (!fetching && !data) {
    return (
      <div>
        <div>There's been an error loading posts.</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Layout>
      <Stack spacing={8} direction="column">
        <NewPost />
        {!data && fetching
          ? null
          : data!.posts.posts.map((p) => (
              <Box
                _hover={{
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
                }}
              >
                <PostItem
                  key={p.id}
                  post={p}
                  canDelete={p.creator.id === meData?.me?.id}
                  canEdit={p.creator.id === meData?.me?.id}
                  // title={p.title}
                  // creator={p.creator}
                  // upvotes={p.points}
                  // desc={`${p.textSnippet}...`}
                />
              </Box>
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
