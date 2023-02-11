import React, { useState, useEffect, useRef } from 'react';
import {
  Form,
  useActionData,
  useOutletContext
} from 'react-router-dom'

import {
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import CryptoJS from 'crypto-js';

import { NotifyWindow, UsersTable } from './Compoment';

async function sendChangePasswordReq(username, pwd) {
  const result = {}
  const pwdDigest = CryptoJS.MD5(pwd).toString(CryptoJS.enc.Base64);
  const auth_token = sessionStorage.getItem('token');
  const data = {
    "user": username,
    "passwordHA": pwdDigest
  }
  try {
    const response = await fetch("/api/change-password",
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Accept': 'application.json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`,
        },
        body: JSON.stringify(data)
      }
    );

    if (response.ok) {
      const res = await response.json();
      if (res.result) {
        if (res.result === 'success') {
          result.type = 'success';
          result.reason = 'Your Password have been modifyed successfully.';
          return result;
        } else if (res.result === 'failed') {
          result.type = 'change password failed';
          result.reason = res.message;
          return result;
        }
      }
    } else {
      result.type = 'Server Error';
      result.reason = `An error from server, by ${response.statusText} (${response.status})`;
      return result;
    }
  }
  catch (error) {
    console.error(error);
    result.type = 'Internal Program Error';
    result.reason = `An error occurred, by ${error.message} while reading server data`;
    return result;
  };
}

async function sendAddUserReq(username, pwd){
  const result = {}
  const pwdDigest = CryptoJS.MD5(pwd).toString(CryptoJS.enc.Base64);
  const auth_token = sessionStorage.getItem('token');
  const data = {
    "user": username,
    "passwordHA": pwdDigest
  }
  try {
    const response = await fetch("/api/add-user",
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Accept': 'application.json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`,
        },
        body: JSON.stringify(data)
      }
    );

    if (response.ok) {
      const res = await response.json();
      if (res.result) {
        if (res.result === 'success') {
          result.type = 'success'
          result.reason = 'User created successfully.';
          return result;
        } else if (res.result === 'failed') {
          result.type = 'add user failed';
          result.reason = res.message;
          return result;
        }
      }
    } else {
      result.type = 'Server Error';
      result.reason = `An error from server, by ${response.statusText} (${response.status})`;
      return result;
    }
  }
  catch (error) {
    console.error(error);
    result.type = 'Internal Program Error';
    result.reason = `An error occurred, by ${error.message} while reading server data`;
    return result;
  };
}

async function sendDelUserReq(username){
  const result = {}
  const auth_token = sessionStorage.getItem('token');
  const data = {
    "user": username
  }
  try {
    const response = await fetch("/api/delete-user",
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Accept': 'application.json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`,
        },
        body: JSON.stringify(data)
      }
    );

    if (response.ok) {
      const res = await response.json();
      if (res.result) {
        if (res.result === 'success') {
          result.type = 'success'
          result.reason = 'User have been deleted successfully.';
          return result;
        } else if (res.result === 'failed') {
          result.type = 'delete user failed';
          result.reason = res.message;
          return result;
        }
      }
    } else {
      result.type = 'Server Error';
      result.reason = `An error from server, by ${response.statusText} (${response.status})`;
      return result;
    }
  }
  catch (error) {
    console.error(error);
    result.type = 'Internal Program Error';
    result.reason = `An error occurred, by ${error.message} while reading server data`;
    return result;
  };
}

export async function UserAction({ params, request }) {
  const errors = {}
  const formData = await request.formData();
  const op = formData.get('operation')
  if (op == "change-password") {
    const username = formData.get('username');
    const password1 = formData.get('passwd1');
    const password2 = formData.get('passwd2');

    if (password1.length === 0 || password2.length === 0) {
      errors.type = 'Input Error';
      errors.reason = 'The input cannot be empty!';
      return errors;
    } else if (password1 !== password2) {
      errors.type = 'Input Error';
      errors.reason = 'The two entered passwords are different.';
      return errors;
    }
    
    return await sendChangePasswordReq(username, password1);
  }else if(op === 'delete-user'){
    const username = formData.get('username');

    if (username.length ===0) {
      errors.type = 'Input Error';
      errors.reason = 'The input cannot be empty!';
      return errors;
    } 

    return await sendDelUserReq(username);

  }else if(op === 'add-user'){
    const username = formData.get('username');
    const password1 = formData.get('passwd1');
    const password2 = formData.get('passwd2');    
    
    if (username.length ===0 || password1.length === 0 || password2.length === 0) {
      errors.type = 'Input Error';
      errors.reason = 'The input cannot be empty!';
      return errors;
    } else if (password1 !== password2) {
      errors.type = 'Input Error';
      errors.reason = 'The two entered passwords are different.';
      return errors;
    }

    return await sendAddUserReq(username, password1);
  }

}

function ChangePasswordForm() {
  const username = sessionStorage.getItem('currentUser');
  const errors = useActionData();
  const [showError, setShowError] = useState(true);
  const isSuccessRef = useRef(false);

  if(errors){
    if(errors.type === 'success'){
      isSuccessRef.current = true;
    }else{
      isSuccessRef.current = false;
    }
  }

  const refresh = () => setShowError(true);

  function handleClose(){
    if(isSuccessRef.current){
      window.location.href ='/login';
    }else{        
      setShowError(false);
    }
  }

  return (
    <>
      <Form method='post' action='/user' replace > 
        <input type="hidden" id="operation" name="operation" value="change-password" />
        <input type="hidden" id="username" name="username" value={username} />
        <div className="ms-5 me-5 mb-5">
          <p className="text-sm-start p-2 fs-5">
            Change Password:
          </p> 
          <MDBInput
            className='mb-4' type='password' id='formUsername'
            name='passwd1' label='Enter new Password' maxLength='16'
          />
          <MDBInput
            className='mb-4' type='password' id='formPasswd'
            name='passwd2' label='enter new password again' maxLength='32'
          />
          <MDBBtn type='submit' onClick={refresh} block>
            Change Password
          </MDBBtn>

          {
            (errors) ? (
              <NotifyWindow title={errors.type} show={showError} setShow={setShowError} onClose={handleClose}>
                {errors.reason}
              </NotifyWindow>
            ) : null
          }
        </div>
      </Form>
    </>
  );

}

function CloseAccountCheck() {
  const errors = useActionData();
  const [showError, setShowError] = useState(true);
  const username = sessionStorage.getItem('currentUser');
  const isSuccessRef = useRef(false);

  if(errors){
    if(errors.type === 'success'){
      isSuccessRef.current = true;
    }else{
      isSuccessRef.current = false;
    }
  }

  function handleClose(){
    if(isSuccessRef.current){
      window.location.href ='/login';
    }else{        
      setShowError(false);
    }
  }

  return (
    <div className='mb-5 mx-5'>
      <p className="text-sm-start p-2">
        This action will delete all data on your account. Are you sure you want to continue with this operation?
      </p>
      <Form method='post' action='/user' replace >
        <input type="hidden" id="operation" name="operation" value="delete-user" />
        <input type="hidden" id="username" name="username" value={username} />
        <MDBBtn type='submit'>
          I decided to close my account
        </MDBBtn>
        {
          (errors) ? (
            <NotifyWindow title={errors.type} show={showError} setShow={setShowError} onClose={handleClose}>
              {errors.reason}
            </NotifyWindow>
          ) : null
        }
      </Form>
    </div>
  );
}

function ShowUserManager(){
  const errors = useActionData();
  const [showError, setShowError] = useState(true);
  const [isCreateUser, setIsCreateUser] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  function handleClose(){
    // setShowError(false);
    window.location.reload();
  }

  function getAllUsers(){
    const auth_token = sessionStorage.getItem('token');

    fetch("/api/allusers",
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Accept': 'application.json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`,
        }
      }
    ).then((response)=>{
      if (response.ok) {
        response.json().then(
          (data)=>{
            if(data.result==='success'){
              setAllUsers(data.allusers);
            }
          }
        );
      }
    });
  }

  useEffect(()=>{
    getAllUsers();
  });

  return(
    <div className='mx-5 mb-5'>
      {
        (isCreateUser)?(
          <Form method='post' action='/user' replace >
            <input type="hidden" id="operation" name="operation" value="add-user" />
            <div className="ms-5 me-5 mb-5">
              <p className="text-sm-start p-2 fs-5">
                Create a new normal user
              </p>  
              <MDBInput 
                className='mb-4' type='text' id='formUsername'
                name='username' label='Username' maxLength='16'
              />
              <MDBInput
                className='mb-4' type='password' id='formUsername'
                name='passwd1' label='Enter Password' maxLength='16'
              />
              <MDBInput
                className='mb-4' type='password' id='formPasswd'
                name='passwd2' label='Enter  password again' maxLength='32'
              />
              <div className='d-flex mt-4 justify-content-end'>
                <MDBRow className='gx-2'>
                  <MDBCol>
                    <MDBBtn type='submit'>
                      Create
                    </MDBBtn>
                  </MDBCol>
                  <MDBCol>
                    <MDBBtn onClick={()=>{setIsCreateUser(false)}}
                    >
                      back
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </div>
    
              {
                (errors) ? (
                  <NotifyWindow title={errors.type} show={showError} setShow={setShowError} onClose={handleClose}>
                    {errors.reason}
                  </NotifyWindow>
                ) : null
              }
            </div>
          </Form>
        ) : (
          <>
            <UsersTable users={allUsers}/>
            <div className='d-flex mt-4 justify-content-start'>
              <MDBRow className='gx-2'>
                <MDBCol>
                  <MDBBtn onClick={()=>{setIsCreateUser(true)}}
                  >
                    <MDBIcon fas icon="plus" />
                  </MDBBtn>
                </MDBCol>
                <MDBCol>
                  <MDBBtn onClick={getAllUsers}
                  >
                    <MDBIcon fas icon="sync" />
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </div>
          </>
        )
      }
    </div>
  );
}

export function UserPage() {
  const [currentPage, setCurrentPage] = useOutletContext();
  const [basicActive, setBasicActive] = useState('tab1');

  const currentUser = sessionStorage.getItem('currentUser');

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    sessionStorage.setItem('UserPageTab', value);
    setBasicActive(value);
  };

  useEffect(() => {

    if (currentPage !== 'User') {
      setCurrentPage('User')
    }
  }
  );

  useEffect(() => {
    if (sessionStorage.getItem('UserPageTab')) {
      const active = sessionStorage.getItem('UserPageTab');
      setBasicActive(active);
    }
  },[setBasicActive]
  );

  return (
    <main>
      <MDBContainer fluid className='d-flex justify-content-center p-5 mt-5'>
        <div className='shadow  mt-0 user-page'>
          <MDBTabs fill className='mb-3'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                Chang Password
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                {(currentUser === "admin")?('Normal Users'):('Cloes Account')}
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
          <MDBTabsContent>
            <MDBTabsPane show={basicActive === 'tab1'}>
              <ChangePasswordForm />
            </MDBTabsPane>
            <MDBTabsPane show={basicActive === 'tab2'}>
              {
                (currentUser === "admin")?(
                  <ShowUserManager />
                ) : (
                  <CloseAccountCheck />
                )
              }
            </MDBTabsPane>
          </MDBTabsContent>
        </div>
      </MDBContainer>
    </main>
  );
}