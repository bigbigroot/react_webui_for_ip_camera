import React, { useState } from 'react';

import {MDBInput,MDBBtn, MDBIcon, MDBContainer} from 'mdb-react-ui-kit';

import {AppsPageNavbar} from './myStyleNavbar';
import { redirect } from 'react-router-dom';

export async function LoginAction({params, request}){
  const formData = await request.formData();
  console.log(formData);
  return redirect("/camera");
}


export function LoginForm(props){
  const [usernameValue, setUsernameValue] = useState("");
  const [PasswordValue, setPasswordValue] = useState("");


  return(
    <div className="text-center mt-5 p-5 border bg-light rounded shadow" id="loginform">
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
      <main>
        <MDBContainer fluid>
          <div className="d-flex justify-content-center">
            <LoginForm />
          </div>
        </MDBContainer> 
      </main>  
  );
}