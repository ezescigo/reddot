import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export interface User {
  id: number;
  username: string;
}
export interface CardProps {
  title: string;
  desc: string;
  upvotes: number;
  creator: User;
}

export const Card: React.FC<CardProps> = ({
  title,
  desc,
  creator,
  upvotes,
  ...rest
}) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading> {`by ${creator.username}`}
      <Flex direction="column">
        <Box mt={4} mb={2}>
          <Text>{desc}</Text>
        </Box>
        <Box mt={1} ml="auto">
          <Text>{`Likes: ${upvotes}`}</Text>
        </Box>
      </Flex>
    </Box>
  );
};
