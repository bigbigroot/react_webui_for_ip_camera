import React, { useState, useEffect, useRef } from 'react';
import {
  Form,
  useActionData,
  useOutletContext
} from 'react-router-dom'

import {
  MDBBtn,
  MDBIcon,
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody
} from 'mdb-react-ui-kit';


export function WifiPage(props){  
	const {aps} = props;
  const [currentPage, setCurrentPage] = useOutletContext();

  function getAllAps()
  {

  }

  useEffect(() => {
    if (currentPage !== 'Wireless') {
      setCurrentPage('Wireless')
    }
  }
  );

  return (
    <MDBContainer fluid className='d-flex justify-content-center p-5 mt-5'>
      <div className='mt-0 user-page'>
        <Form>
        <MDBTable striped>
            <MDBTableHead>
            <tr>
                <th scope='col'>Num</th>
                <th scope='col'>SSID</th>
                <th scope='col'>Security</th>
                <th scope='col'>Action</th>
            </tr>
            </MDBTableHead>
            <MDBTableBody>
            {
                (aps)?(
                  aps.map((ap, index) => (
                    <tr key={index+1}>
                      <th scope='row'>{index+1}</th>
                      <td >{ap[0]}</td>
                      <td >{ap[1]}</td>
                      <td>
                          <MDBBtn tag='a' color='none' className='m-1'>
                            <MDBIcon fas icon='edit' size='lg' />
                          </MDBBtn>
                      </td>
                    </tr>
                ))
                ) : null
            }
            </MDBTableBody>
        </MDBTable>
        </Form>  
        <div className='d-flex mt-4 justify-content-start'>
          <MDBBtn onClick={getAllAps}
          >
            <MDBIcon fas icon="sync" />
          </MDBBtn>
        </div>   
      </div>
    </MDBContainer>
  )
}