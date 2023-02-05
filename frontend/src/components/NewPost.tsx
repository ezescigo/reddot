import { Avatar, Box, Flex, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";

const NewPost: React.FC<any> = () => {
  const router = useRouter();

  return (
    <Flex p={4} direction="row" shadow="md" borderWidth="1px">
      <Box>
        <Avatar src="/broken-image.jpg" />
      </Box>
      <Box ml={2} flex={1} mr="auto" alignSelf={"center"}>
        <Input
          placeholder="Publish"
          _hover={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
          }}
          onClick={() => {
            router.push("/create-post");
          }}
        />
      </Box>
    </Flex>
  );
};

export default NewPost;
