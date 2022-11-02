import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, FloatingLabel, Form} from 'react-bootstrap';

class LoginForm extends React.Component{

    render(){
        return(
            <div class="text-center mt-5 p-5 border bg-light rounded shadow" id="loginForm">
              <Form>
                <h1 class="h3 mb-4 font-weight-normal">Login</h1>
                <FloatingLabel className="mb-4" controlId="formUsername" label="Username">
                  <Form.Control type="username" placeholder="Username" />
                </FloatingLabel>

                <FloatingLabel className="mb-4" controlId="formPassword" label="Password">
                  <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>

                <div class="d-grid gap-2">
                  <Button variant="dark" type="submit">
                    Login 
                  </Button>
                </div>
              </Form>
            </div>
        )
    }
}


export default LoginForm;