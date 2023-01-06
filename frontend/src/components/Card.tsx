import { Box, Heading, Text } from "@chakra-ui/react";

export interface CardProps {
  title: string;
  desc: string;
}

export const Card: React.FC<CardProps> = ({ title, desc, ...rest }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
};
