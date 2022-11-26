import './App.css';
import './pages.css';
import '@fontsource/roboto';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet
} from "react-router-dom";

import {AppsPageNavbar} from './myStyleNavbar';
import {ErrorPage, NotFoundPage} from './ErrorPage';
import {LoginAction, LoginPage} from './LoginPage';
import {CameraPage} from './CameraDisplayer';

async function rootAction(){

}

function Root(){
  return(    
    <div className="App">
      <header>
        <AppsPageNavbar />
      </header>
      <Outlet />
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
        errorElement: <ErrorPage />,
        action: LoginAction
      },
      {
        path: "camera",
        element: <CameraPage />,
        errorElement: <ErrorPage />,
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
