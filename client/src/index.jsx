import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

// third party style
import 'perfect-scrollbar/css/perfect-scrollbar.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StyledEngineProvider>
);

serviceWorker.unregister();
