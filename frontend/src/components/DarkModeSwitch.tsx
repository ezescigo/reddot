import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Button, IconButton, useColorMode } from "@chakra-ui/react"

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
