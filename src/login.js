import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Container, Form} from 'react-bootstrap';

class LoginForm extends React.Component{

    render(){
        return(
            <Container className="container-sm">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
            
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button>
                    Sign in
                </Button>
              </Form>
            </Container>
        )
    }
}


export default LoginForm;