import React, { useRef } from 'react';
import {
	MDBIcon,
  MDBBtn,
  MDBModal,
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
import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useSubmit, useActionData, Form, useSearchParams } from 'react-router-dom';

export function NotifyWindow(props) {
  const {title, show, setShow} = props;
//   const [showWin, setShowWin] = useState(!disable);

  const closeWin = () => setShow(false);

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
              <MDBBtn className='btn-close' color='none' onClick={closeWin}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className='p-4 text-start'> 
                {props.children}
              </div> 
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={closeWin}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
  );
}

export function VerifyWindow(props) {
  const {title, buttonText, onOK, show, setShow} = props;
//   const [showWin, setShowWin] = useState(!disable);

  const closeWin = () => setShow(false);

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
              <MDBBtn className='btn-close' color='none' onClick={closeWin}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className='p-4 text-start'> 
                {props.children}
              </div> 
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' type='submit'>
                {buttonText}
              </MDBBtn>
              <MDBBtn color='secondary' onClick={closeWin}>
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
	const submit = useSubmit();
	const [showDeleteWin, setShowDeleteWin] = useState(false);
  const [showError, setShowError] = useState(true);
  const selectUserRef = useRef(null);
  const errors = useActionData();

  function handleSubmit(){
    // setShowDeleteWin(false);
  }

	function handleDelete(user){
    selectUserRef.current = user;
		setShowDeleteWin(true);
	}

	function handleEdit(user){

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
                <tr>
                  <th scope='row'>{index+1}</th>
                  <td >{username}</td>
                  <td>
                    <MDBBtn tag='a' color='none' className='m-1'
                    onClick={()=>{handleEdit(username)}}>
                      <MDBIcon fabs icon='edit' size='lg' />
                    </MDBBtn>
                    
                    <MDBBtn tag='a' color='none' className='m-1'
                    onClick={()=>{handleDelete(username)}}>
                      <MDBIcon fabs icon='trash-alt' size='lg' />
                    </MDBBtn>
                  </td>
                </tr>
              ))
            ) : null
          }
        </MDBTableBody>
      </MDBTable>
      <Form method='post' action='/user' onSubmit={handleSubmit}>
        <input type="hidden" id="operation" name="operation" value="delete-user" />
        <input type="hidden" id="username" name="username" value={selectUserRef.current} />
        <VerifyWindow title={'Delete User:'} buttonText="I'm Sure"
        show={showDeleteWin} setShow={setShowDeleteWin}>
          This action will delete all data on your account.
          Are you sure you want to continue with this operation?
        </VerifyWindow>
        {
          (errors) ? (
            <NotifyWindow title={errors.type} show={showError} setShow={setShowError}>
              {errors.reason}
            </NotifyWindow>
          ) : null
        }
      </Form>
		</>
	);
}