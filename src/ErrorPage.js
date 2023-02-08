import { Navigate, useRouteError } from "react-router-dom";
import {
    MDBBtn
} from "mdb-react-ui-kit"

import {AppsPageNavbar} from './myStyleNavbar';


export function ErrorPage(){
    const error = useRouteError();
    let errorText;
    let pageText;
    console.error(error);
    switch (error.status) {
        case 401:
        {
          return <Navigate to="login" />;
        }
        case 403:
        {
            errorText = "Forbidden";
            pageText = "The server denied your access or an other error eccured";
            break;
        }
        case 404:
        {
            errorText = "Page Not Found";
            pageText = "The Page you are looking for doesn't exist or an other error eccured";
            break;
        }
        case 503:
        {
            errorText = "Service Unavailable";
            pageText = "The Page is busy or an other error eccured";
            break;
        }  
        default:
        {
            errorText = error.statusText || error.message;
            pageText = "The Page you are looking for exist an unknow error";
            break;
        }
    }

    return (        
      <div className="App">
        <header>
          <AppsPageNavbar />
        </header>
        <main>
          <div className="mt-5 d-flex justify-content-center" id="error-page">
            <div className="text-break w-50 error-page">
              <h1 className="fw-bolder">{error.status}</h1>
            
              <h3 className="fw-bold">{errorText}</h3>
              <p className="text-sm-start p-2">
                {pageText}. 
                Go back, or ahead over to Homepage to choose a new direction.
              </p>
              <MDBBtn href="/">
                Go Back to the Homepage
              </MDBBtn>
            </div>
          </div>
        </main>
      </div>
    );
}

export function NotFoundPage(){
    return (        
        <main>
          <div className="mt-5 d-flex justify-content-center" id="error-page">
            <div className="text-break w-50 error-page">
              <h1 className="fw-bolder">404</h1>
            
              <h3 className="fw-bold">Page Not Found</h3>
              <p className="text-sm-start p-2">
                The Page you are looking for doesn't exist or an other error eccured. 
                Go back, or ahead over to Homepage to choose a new direction.
              </p>
              <MDBBtn href="/">
                Go Back to the Homepage
              </MDBBtn>
            </div>
          </div>
        </main>
    );
}