import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  children: any;
  variant?: "small" | "regular";
}

const Wrapper: React.FunctionComponent<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
