import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components/common/others';
import routes from './routes';

const App = () => {
  const content = useRoutes(routes);

  return (
    <MatxTheme>
      <CssBaseline />
      {content}
    </MatxTheme>
  );
};

export default App;
