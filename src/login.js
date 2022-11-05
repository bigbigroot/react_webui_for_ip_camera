import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, FloatingLabel, Form} from 'react-bootstrap';

class LoginForm extends React.Component{

    render(){
        return(
            <div class="text-center mt-5 p-5 border bg-light rounded shadow" id="loginForm">
              <Form>
                <h1 class="h3 mb-4 font-weight-normal">LOGIN</h1>
                <FloatingLabel className="mb-4" controlId="formUsername" label="Username">
                  <Form.Control type="text" placeholder="Username" maxLength="16" />
                </FloatingLabel>

                <FloatingLabel className="mb-4" controlId="formPassword" label="Password">
                  <Form.Control type="password" placeholder="Password"  maxLength="32"/>
                </FloatingLabel>

                <div class="d-grid gap-2">
                  <Button variant="dark" type="submit">
                    LOGIN 
                  </Button>
                </div>
              </Form>
            </div>
        );
    }
}


export default LoginForm;