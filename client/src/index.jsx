import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import App from './app/App';
import AppIndex from './app/AppIndex';
import * as serviceWorker from './serviceWorker';

// third party style
import 'perfect-scrollbar/css/perfect-scrollbar.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  (window.location.pathname === "/") ?
    <>
      <React.StrictMode>
        <AppIndex />
      </React.StrictMode>
    </>
    :
    <>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StyledEngineProvider>
    </>
);

serviceWorker.unregister();
