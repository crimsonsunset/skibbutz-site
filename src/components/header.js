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
import { mediaQueries } from "@styles/theme"

let StyledNavbar = styled(props => <Navbar {...props} />)`
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0px !important;
  
  .navbar-toggler{
    margin-right: 0.75rem;
  }
  
  .nav-item {
    text-align: center;
  }

  .navbar-collapse{
    margin-top: 20px;
    
    ${mediaQueries[1]}{
      margin-top: 0px !important;
    }
  }
  
  .container{
    display: contents;
  }
  
`

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  // todo: fix logo with gatsby img
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
