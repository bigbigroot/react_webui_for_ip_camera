import {React, useState} from 'react';

import {
  MDBContainer, 
  MDBNavbar, 
  MDBNavbarBrand, 
  MDBNavbarToggler, 
  MDBCollapse, 
  MDBTabs, 
  MDBTabsItem, 
  MDBTabsLink,
  MDBIcon
} from 'mdb-react-ui-kit'

//draw navigator bar 
export default function AppsPageNavbar(props){
  const {disable} = props;

  const [showNavNoToggler, setShowNavNoToggler] = useState(false);
  const [basicActive, setBasicActive] = useState('Camera');

  function handleBasicClick(value){
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return(
    <MDBNavbar fixed='top' sticky expand="md">      
      <MDBContainer fluid>
        <MDBNavbarBrand className="ms-5 fw-bold font-monospace text-uppercase fs-5" href="#">
          <img 
            src="./640px-WiFi_Logo.svg.png" 
            width="40"
            height="30"
            alt="WiFi"
            className="d-inline-block align-center"
          />{' '}
          camera
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          onClick={() => setShowNavNoToggler(!showNavNoToggler)}
        >            
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavNoToggler}>
        {
          (!disable)?(
            <MDBTabs justify  className="mx-auto">
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('Camera')} active={basicActive === 'Camera'}>Camera</MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('Network')} active={basicActive === 'Network'}>Network</MDBTabsLink>                  
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('Wireless')} active={basicActive === 'Wireless'}>Wireless</MDBTabsLink>                  
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('Users')} active={basicActive === 'Users'}>Users</MDBTabsLink> 
            </MDBTabsItem>                 
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('Help')} active={basicActive === 'Help'}>Help</MDBTabsLink> 
            </MDBTabsItem>
            </MDBTabs>
          ) : null
        }
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}