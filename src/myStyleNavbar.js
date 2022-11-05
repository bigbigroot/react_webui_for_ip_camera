import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container, Nav, Navbar, Stack} from 'react-bootstrap';

//draw navigator bar 
function MyStyleNavbar(){
    return(
      <Navbar fixed="top" variant="dark" bg="dark" expand="lg">
        <Navbar.Brand className="ms-auto" href="#">
          <img
            alt="icon"
            src="ip-camera-icon-dark.png"
            width="30"
            height="30"
            className="d-inline-block align-bootom"
          />
        Wireless Network Camera
        </Navbar.Brand>
        <Container className="container-fluid">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Stack direction="horizontal" gap={4}>
                <Nav.Link eventKey="camera">Camera</Nav.Link>
                <Nav.Link eventKey="network">Network</Nav.Link>
                <Nav.Link eventKey="wifi">Wireless</Nav.Link>
                <Nav.Link eventKey="users">Users</Nav.Link>
                <Nav.Link eventKey="help">Help</Nav.Link>
              </Stack>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default MyStyleNavbar;