import React, { useState } from "react"
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
} from "reactstrap"
import Link from "./link"
import Navigation from "reactstrap-json-nav"
import logo from "@img/logo.png"
import styled from "styled-components"
import { getNavigation } from "@data/navigation.js"

let StyledNavbar = styled(props => <Navbar {...props} />)`
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0px !important;
`

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <StyledNavbar color="light" light expand="md">
      <Container>
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" height="100px" />
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Navigation
            json={getNavigation()}
            link={Link}
            activeClassName="active"
          />
        </Collapse>
      </Container>
    </StyledNavbar>
  )
}

export default Header
