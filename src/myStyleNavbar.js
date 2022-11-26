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
  MDBIcon,
  MDBFooter,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink
} from 'mdb-react-ui-kit'

//draw navigator bar 
export function AppsPageNavbar(props){
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
        <MDBNavbarBrand className="ms-5 fw-bold font-monospace text-uppercase fs-5" href="/">
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
            <MDBNavbarNav>
              <MDBTabs justify  className="mx-auto">
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('Camera')} active={basicActive === 'Camera'} href="/camera">Camera</MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('Network')} active={basicActive === 'Network'} href="/network">Network</MDBTabsLink>                  
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('Wireless')} active={basicActive === 'Wireless' } href="/wifi">Wireless</MDBTabsLink>                  
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('Users')} active={basicActive === 'Users'} href="/user">Users</MDBTabsLink> 
              </MDBTabsItem>                 
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('Help')} active={basicActive === 'Help'} href="/help">Help</MDBTabsLink> 
              </MDBTabsItem>
              </MDBTabs>
              <MDBNavbarItem className='ms-auto'>
                <MDBNavbarLink href='/login'>
                  <MDBIcon fas icon="sign-out-alt" />
                </MDBNavbarLink>
              </MDBNavbarItem> 
            </MDBNavbarNav>           
          ) : null
        }
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export function AppsFooter()
{
  return(
    <MDBFooter className="text-center text-lg-left">
    <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
    &copy;  {new Date().getFullYear()} create by <MDBIcon fas icon='user'></MDBIcon> Huang, Weigen.
    </div>
    </MDBFooter>
  );
}