import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { MeQuery, useLogoutMutation } from "../generated/graphql"
import { DarkModeSwitch } from "./DarkModeSwitch"
import { IconLogout2, IconUser } from "@tabler/icons-react"

interface UserMenuProps {
  user: MeQuery
  isOpen: boolean
  onCloseDrawer: () => void
}

interface UserMenuButtonProps {
  label: string
  icon: JSX.Element
  isLoading?: boolean
  onClick: () => void
}

const UserMenuButton: React.FC<UserMenuButtonProps> = ({ label, icon, isLoading, onClick }) => {
  return (
    <Button
      justifyContent={"flex-start"}
      width={"100%"}
      variant={"ghost"}
      onClick={onClick}
      leftIcon={icon}
      isLoading={isLoading}
      fontWeight={"thin"}
    >
      {label}
    </Button>
  )
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, isOpen, onCloseDrawer }) => {
  const router = useRouter()
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()

  return (
    <Drawer placement={"right"} onClose={onCloseDrawer} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">{user.me?.username}</DrawerHeader>
        <DrawerBody borderBottomWidth="1px" pt={4} pl={2}>
          <UserMenuButton
            label="Your profile"
            icon={<IconUser />}
            onClick={() => {
              router.push("/profile")
            }}
          />
          <DarkModeSwitch />
        </DrawerBody>
        {/* <DrawerBody borderBottomWidth="1px" pt={4} pl={4}>
          <DarkModeSwitch />
        </DrawerBody> */}
        <DrawerBody pt={4} pl={2}>
          <UserMenuButton
            label="Sign out"
            icon={<IconLogout2 />}
            isLoading={logoutFetching}
            onClick={async () => {
              await logout({})
              router.reload()
            }}
          />
        </DrawerBody>
        <DrawerFooter>
          <Text fontSize={"small"}>R. © 2023. This is a non-profit personal project.</Text>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
