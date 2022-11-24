import React from 'react';

import {MDBInput,MDBBtn, MDBIcon, MDBContainer} from 'mdb-react-ui-kit'

export function LoginForm(){

  return(
    <div className="text-center mt-5 p-5 border bg-light rounded shadow" id="loginForm">
      <form>
        <div className="ms-5 me-5">
        <MDBIcon  size='3x' fas icon="user-circle" />
        <h6 className="mb-5 mt-3 fw-lighter text-break">
          Login with your username and Password
        </h6>

        </div>
                
        <MDBInput className='mb-4' type='text' id='formUsername' label='Username' maxLength='16'/>
        <MDBInput className='mb-4' type='password' id='formPasswd' label='Password' maxLength='32'/>

        <MDBBtn type='submit' block>
          Login
        </MDBBtn>
      </form>
    </div>
  );
}

export function LoginPage()
{
  return(
    <MDBContainer fluid>
      <div className="d-flex justify-content-center">
        <LoginForm />
      </div>
    </MDBContainer>
  );
}