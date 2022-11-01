import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container, Nav, Navbar} from 'react-bootstrap';

//draw navigator bar 
function MyStyleNavbar(){
    return(
      <Navbar fixed="top" variant="dark" bg="dark" expand="lg">
        <Container className="container-fluid">
        <Navbar.Brand href="#">
          <img
            alt="icon"
            src="ip-camera-icon-dark.png"
            width="30"
            height="30"
            className="d-inline-block align-bootom"
          />
        Wireless Network Camera
        </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link eventKey="home">Home</Nav.Link>
              <Nav.Link eventKey="settings">Settings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default MyStyleNavbar;