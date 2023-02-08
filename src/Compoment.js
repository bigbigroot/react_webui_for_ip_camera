import React from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

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

export function Notification(props) {
  const [position, setPosition] = useState('top-start');

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