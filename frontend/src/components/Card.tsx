import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { PostsQuery } from "../generated/graphql";
import { VotesSection } from "./VotesSection";

export interface User {
  id: number;
  username: string;
}
export interface CardProps {
  // Cant make Fragments to work (urqlClient doesnt inffer Query data type (Post) correctly)
  post: PostsQuery["posts"]["posts"][0];
}

export const Card: React.FC<CardProps> = ({ post }) => {
  console.log(post);
  return (
    <Flex p={5} direction="row" shadow="md" borderWidth="1px">
      <VotesSection postId={post.id} points={post.points} />
      <Box mt={3}>
        <Heading fontSize="xl">{post.title}</Heading>{" "}
        {`by ${post.creator.username}`}
        <Box mt={4} mb={2}>
          <Text>{`${post.textSnippet}...`}</Text>
        </Box>
      </Box>
    </Flex>
  );
};
