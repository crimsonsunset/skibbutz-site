import React, { useState } from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler
} from 'reactstrap';
import Link from './link'
import Navigation from 'reactstrap-json-nav'
import * as nav from '../data/navigation.js';
import logo from '../assets/images/logo.png'
import styled from 'styled-components'

let StyledNavbar = styled(props => <Navbar {...props}/>)`
  position: sticky;
  top: 0;
  z-index: 10;
`

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <StyledNavbar color="light" light expand="md">
      <Container>
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" height="45px"/>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Navigation
            json={nav.navigation}
            link={Link}
            activeClassName="active"
          />
        </Collapse>
      </Container>
    </StyledNavbar>
  );
}

export default Header;
