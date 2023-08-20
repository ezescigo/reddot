import { useColorMode, IconButton, Box, Switch, Text, Button } from "@chakra-ui/react"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === "dark"
  return (
    <Button
      justifyContent={"flex-start"}
      width={"100%"}
      variant={"ghost"}
      onClick={toggleColorMode}
      fontWeight={"thin"}
      leftIcon={
        <IconButton
          // position="fixed"
          // top={4}
          // right={4}
          size={"xs"}
          icon={isDark ? <SunIcon /> : <MoonIcon />}
          aria-label="Toggle Theme"
          colorScheme="green"
        ></IconButton>
      }
    >
      {isDark ? "Dark" : "Light"} Mode
    </Button>
  )
}
