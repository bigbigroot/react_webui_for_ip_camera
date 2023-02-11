import React, {useEffect, useState} from 'react';
import {Form, useActionData, redirect, useOutletContext} from 'react-router-dom'

import {MDBInput,MDBBtn, MDBIcon, MDBContainer} from 'mdb-react-ui-kit';
import CryptoJS from 'crypto-js';

import { NotifyWindow } from './Compoment';

export function LoginLoader(){
  try{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('UserPageTab');
  }catch(e){
    console.error(e);
  }
}

export async function LoginAction({params, request}){
  const errors = {}
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('passwd');

  if(username.length === 0 || password.length === 0){
    errors.type = 'Input Error';
    errors.reason = 'Username and password cannot be empty!';
    return errors;
  }

  const pwdDigest = CryptoJS.MD5(password).toString(CryptoJS.enc.Base64);

  const data = {
    "user": username,
    "passwordHA": pwdDigest
  }
  try{
    const response = await fetch("/api/login", 
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Accept': 'application.json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );

    if (response.ok) {
      const res = await response.json();
      if(res.result){
        if(res.result === 'Accept'){
          const token = res.token;
          // store token from server 
          sessionStorage.setItem('currentUser', username);
          sessionStorage.setItem('token', token);
          return redirect('/camera');
        }else if(res.result === 'Deny'){          
          errors.type = 'Account verification failed';
          errors.reason = res.message + ' please enter the correct username and password';
          return errors;
        }
      }
    }else{
      errors.type = 'Server Error';
      errors.reason = `An error from server, by ${response.statusText} (${response.status})`;
      
      return errors;
    }
  }
  catch(error){
    console.error(error);
    errors.type = 'Internal Program Error';
    errors.reason = `An error occurred, by ${error.message} while reading server data`;
  };
}


export function LoginForm(props){
  const errors = useActionData();
  const [showError, setShowError] = useState(true);
  
  const refresh = ()=>setShowError(true);

  function handleClose(){
    setShowError(false);
  }

  return(
    <div className="text-center mt-5 p-5 border bg-light rounded shadow" id="loginform">
      <Form method='post' replace >
        <div className="ms-5 me-5">
          <MDBIcon  size='3x' fas icon="user-circle" />
          <h6 className="mb-5 mt-3 fw-lighter text-break">
            Login with your username and Password
          </h6>

        </div>
        <MDBInput 
          className='mb-4' type='text' id='formUsername'
          name='username' label='Username' maxLength='16'
        />
        <MDBInput
          className='mb-4' type='password' id='formPasswd'
          name='passwd' label='Password' maxLength='32'
        />
        <MDBBtn type='submit' onClick={refresh} block>
          Login
        </MDBBtn>
        
        {
          (errors)?(
            <NotifyWindow title={errors.type} show={showError} setShow={setShowError} onClose={handleClose}>
              {errors.reason}
            </NotifyWindow>
          ) : null
        }
      </Form>
    </div>
  );
}

export function LoginPage()
{
  const [currentPage, setCurrentPage] = useOutletContext();

  useEffect(()=>{
      if(currentPage != 'Login'){
        setCurrentPage('Login')
      }
    }
  );

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