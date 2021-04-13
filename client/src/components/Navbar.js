import React from 'react'
import { Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

export default function NavbarComp() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Entertainme</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Home</Link></Nav.Link>
            <Nav.Link><Link to="/addmovie" style={{ textDecoration: 'none', color: 'black' }}>Add Movie</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
