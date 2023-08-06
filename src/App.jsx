import { ThemeProvider } from '@mui/material/styles';
import Router from './routes';
import theme from './theme';
import ErrorDialog from './components/ErrorDialog';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>

      <ErrorDialog />
    </>
  );
}

export default App;
