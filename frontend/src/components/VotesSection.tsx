import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useVoteMutation } from "../generated/graphql";

interface VotesSectionProps {
  postId: number;
  points: number;
  voteStatus?: number | null;
}

export const VotesSection: React.FC<VotesSectionProps> = ({
  postId,
  points,
  voteStatus,
}) => {
  const [, vote] = useVoteMutation();
  const [voteLoading, setVoteLoading] = useState<
    "up-loading" | "down-loading" | "not-loading"
  >("not-loading");
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      mr={"3"}
    >
      <IconButton
        onClick={async () => {
          setVoteLoading("up-loading");
          await vote({
            postId: postId,
            value: 1,
          });
          setVoteLoading("not-loading");
        }}
        isLoading={voteLoading === "up-loading"}
        variant="solid"
        colorScheme={voteStatus === 1 ? "green" : undefined}
        aria-label="Upvote post"
        icon={<ArrowUpIcon boxSize={5} />}
      />
      <Box textAlign={"center"}>
        <Text>{`${points}`}</Text>
      </Box>
      <IconButton
        onClick={async () => {
          setVoteLoading("down-loading");
          await vote({
            postId: postId,
            value: -1,
          });
          setVoteLoading("not-loading");
        }}
        isLoading={voteLoading === "down-loading"}
        variant="solid"
        colorScheme={voteStatus === -1 ? "red" : undefined}
        aria-label="Downvote post"
        icon={<ArrowDownIcon boxSize={5} />}
      />
    </Flex>
  );
};
