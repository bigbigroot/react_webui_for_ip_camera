import React, { useState, useRef } from 'react';
import {
	MDBIcon,
  MDBBtn,
  MDBModal,
  MDBInput,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from 'mdb-react-ui-kit';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useActionData, Form } from 'react-router-dom';

export function NotifyWindow(props) {
  const {title, onClose, show, setShow} = props;

  return (
      <MDBModal show={show} setShow={setShow} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
            {
              (title != undefined)?(
                <MDBModalTitle>{title}</MDBModalTitle>
              ) : null
            }
              <MDBBtn className='btn-close' color='none' onClick={onClose}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className='p-4 text-start'> 
                {props.children}
              </div> 
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={onClose}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
  );
}

export function VerifyWindow(props) {
  const {isVerify, title, buttonText, onOK, onClose, show, setShow} = props;
//   const [showWin, setShowWin] = useState(!disable);

  // const closeWin = () => setShow(false);

  return (
      <MDBModal show={show} setShow={setShow} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
            {
              (title != undefined)?(
                <MDBModalTitle>{title}</MDBModalTitle>
              ) : null
            }
              <MDBBtn className='btn-close' color='none' onClick={onClose}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className='p-4 text-start'> 
                {props.children}
              </div> 
            </MDBModalBody>
            <MDBModalFooter>
              {
                (isVerify)?(                      
                  <MDBBtn color='secondary' type='submit' onClick={onOK}>
                    {buttonText}
                  </MDBBtn>
                ): null
              }
              <MDBBtn color='secondary' onClick={onClose}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
  );
}

export function Notification(props) {

  return (
    <ToastContainer className='mt-4 me-4' position='top-end'>
      <Toast bg='warning'>
        <Toast.Header>
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>See? Just like this.</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export function UsersTable(props){
	const {users} = props;
	const [showEditWin, setShowEditWin] = useState(false);
  const [showDelWin, setShowDelWin] = useState(false);
  const [showError, setShowError] = useState(false);
  // const [active, setActive] = useState("");
  const selectUserRef = useRef("");
  const selectOpRef = useRef("");
  const result = useActionData();

  let title, inhalt;
  if(result){
    title = (result.type)?(result.type):("Unknow");
    inhalt = (result.reason)?(result.reason):("Unknow");
  }else{
    title = "Unknow";
    inhalt = "Unknow";
  }


  function handleCloseWin(){
    if(selectOpRef.current === 'change-password'){
      setShowEditWin(false); 
    }else if(selectOpRef.current === 'delete-user'){
      setShowDelWin(false); 
    }else{
      setShowError(false);
      window.location.reload();
    }
  }


  function handleConfirm(){
    // setActive("result");
    if(selectOpRef.current === 'change-password'){
      setShowEditWin(false); 
      setTimeout(() => {
        setShowError(true);
      }, 400);
    }else if(selectOpRef.current === 'delete-user'){
      setShowDelWin(false); 
      setTimeout(() => {
        setShowError(true);
      }, 400);
    }
    selectOpRef.current = '';
  }

	function handleDelete(user){
    selectUserRef.current = user;
    selectOpRef.current = 'delete-user';
    // setActive("delete-user");
		setShowDelWin(true);
	}

	function handleEdit(user){
    selectUserRef.current = user;
    // setActive("change-password");
    selectOpRef.current = 'change-password';
		setShowEditWin(true);
	}

	return (
		<>
      <MDBTable striped>
        <MDBTableHead>
          <tr>
            <th scope='col'>Num</th>
            <th scope='col'>User</th>
            <th scope='col'>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {
            (users)?(
              users.map((username, index) => (
                <tr key={index+1}>
                  <th scope='row'>{index+1}</th>
                  <td >{username}</td>
                  <td>
                    <MDBBtn tag='a' color='none' className='m-1'
                    onClick={()=>{handleEdit(username)}}>
                      <MDBIcon fas icon='edit' size='lg' />
                    </MDBBtn>
                    
                    <MDBBtn tag='a' color='none' className='m-1'
                    onClick={()=>{handleDelete(username)}}>
                      <MDBIcon fas icon='trash-alt' size='lg' />
                    </MDBBtn>
                  </td>
                </tr>
              ))
            ) : null
          }
        </MDBTableBody>
      </MDBTable>
      <Form method='post' action='/user' onSubmit={handleConfirm} >
        <input type="hidden" id="operation" name="operation" value={selectOpRef.current} />
        <input type="hidden" id="username" name="username" value={selectUserRef.current} />
        <VerifyWindow isVerify={true} title={'Change Password:'} buttonText={'apply'}
        show={showEditWin} setShow={setShowEditWin} onClose={handleCloseWin}>
          <>
            <MDBInput
              className='mb-4' type='password' id='formUsername'
              name='passwd1' label='Enter Password' maxLength='16'
            />
            <MDBInput
              className='mb-2' type='password' id='formPasswd'
              name='passwd2' label='Enter  password again' maxLength='32'
            />
          </>
        </VerifyWindow>
        <VerifyWindow isVerify={true} title={'Change Password:'} buttonText={'delete'}
        show={showDelWin} setShow={setShowDelWin} onClose={handleCloseWin}>
          This action will delete all data on your account.
          Are you sure you want to continue with this operation?
        </VerifyWindow>
        <NotifyWindow title={title} show={showError} setShow={setShowError}  onClose={handleCloseWin}>
          {inhalt}
        </NotifyWindow>
      </Form>
		</>
	);
}