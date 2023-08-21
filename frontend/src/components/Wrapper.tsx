import { Box } from "@chakra-ui/react"
import React from "react"

export type WrapperVariant = "small" | "regular"

interface WrapperProps {
  children: any
  variant?: WrapperVariant
}

const Wrapper: React.FunctionComponent<WrapperProps> = ({ children, variant = "regular" }) => {
  return (
    <Box maxW={variant === "regular" ? "1200px" : "400px"} w="100%" mt={8} mx="auto">
      {children}
    </Box>
  )
}

export default Wrapper
