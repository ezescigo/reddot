import React from "react"
import { NavBar } from "../components/NavBar"
import Wrapper, { WrapperVariant } from "../components/Wrapper"

interface LayoutProps {
  variant?: WrapperVariant
  children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  )
}
