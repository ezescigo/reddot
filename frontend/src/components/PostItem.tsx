import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PostsQuery, useDeletePostMutation } from "../generated/graphql";
import { VotesSection } from "./VotesSection";

export interface User {
  id: number;
  username: string;
}

export interface Creator {
  __typename?: "User" | undefined;
  id: number;
  username: string;
}

export interface PostItemProps {
  // Cant make Fragments to work (urqlClient doesnt inffer Query data type (Post) correctly)
  post: PostsQuery["posts"]["posts"][0];
  canDelete?: boolean;
  canEdit?: boolean;
}

export const PostItem: React.FC<PostItemProps> = ({
  post,
  canDelete = false,
  canEdit = false,
}) => {
  const router = useRouter();
  const [, deletePost] = useDeletePostMutation();
  // console.log(post);
  return (
    <Flex p={5} direction="row" shadow="md" borderWidth="1px">
      <VotesSection
        postId={post.id}
        points={post.points}
        voteStatus={post.voteStatus}
      />
      <Box flex={1} mt={3}>
        <Link href={`/post/${post.id}`}>
          <Heading fontSize="xl">{post.title}</Heading>
        </Link>{" "}
        {`by ${post.creator.username}`}
        <Flex>
          <Box mt={4} mb={2}>
            <Text>{`${post.textSnippet}...`}</Text>
          </Box>
        </Flex>
      </Box>
      <Box>
        {canEdit && (
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit Post"
            variant="link"
            zIndex={2}
            onClick={() => router.push(`/post/edit/${post.id}`)}
          />
        )}
        {canDelete && (
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete Post"
            variant="link"
            color="red.600"
            zIndex={2}
            onClick={() => deletePost({ id: post.id })}
          />
        )}
      </Box>
    </Flex>
  );
};
