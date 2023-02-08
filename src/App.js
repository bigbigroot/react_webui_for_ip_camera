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

function RootLoader(){
  if(sessionStorage.getItem('token')===null){
    return redirect('/login')
  }
}

function Root(){
  const [isLogined, setIsLogined] = useState(false);
  return(    
    <div className="App">
      <header>
        <AppsPageNavbar disable={!isLogined}/>
      </header>
      <Outlet context={[isLogined, setIsLogined]} />
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
        errorElement: <ErrorPage />,
        loader: RootLoader
      },
      {
        path:"*",
        element: <NotFoundPage />
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
