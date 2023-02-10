import './App.css';
import './pages.css';
import '@fontsource/roboto';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import React, { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  redirect
} from "react-router-dom";

import {AppsPageNavbar} from './myStyleNavbar';
import {ErrorPage, NotFoundPage} from './ErrorPage';
import {LoginAction, LoginLoader, LoginPage} from './LoginPage';
import {CameraPage} from './CameraDisplayer';
import { UserAction, UserPage } from './UserPage';

function RootLoader(){
  if(sessionStorage.getItem('token')===null){
    return redirect('/login')
  }
}

function Root(){
  const [currentPage, setCurrentPage] = useState("Login");
  
  return(    
    <div className="App">
      <header>
        <AppsPageNavbar activePage={currentPage}/>
      </header>
      <Outlet context={[currentPage, setCurrentPage]} />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children:[
      { 
        index: true, 
        element: <Navigate to="camera" />,
      },
      {
        path: "login",
        element: <LoginPage />,
        loader: LoginLoader,
        action: LoginAction
      },
      {
        path: "camera",
        element: <CameraPage />,
        loader: RootLoader
      },
      {
        path: "network",
        element: <UserPage />,
        action: UserAction
      },
      {
        path: "wifi",
        element: <UserPage />,
        action: UserAction
      },
      {
        path: "user",
        element: <UserPage />,
        action: UserAction
      },
      {
        path: "404",
        element: <NotFoundPage />
      },
      {
        path:"*",
        element: <Navigate to="404" />
      }
    ],
  },
]);

function App() {
  return (    
      <RouterProvider router={router} />
  );
}

export default App;
