import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components/common/others';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';

const App = () => {
  const content = useRoutes(routes);

  return (
    <MatxTheme>
    <CssBaseline />
    {content}
  </MatxTheme>
    // <SettingsProvider>
    //   {/* <AuthProvider> */}

    //   {/* </AuthProvider> */}
    // </SettingsProvider>
  );
};

export default App;
