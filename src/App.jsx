import { ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import Router from './routes';
import theme from './theme';
// import ErrorDialog from './components/ErrorDialog';
import useAuthStore from './state/stores/authStore';
import { useEffect } from 'react';
import useLoading from './hooks/useLoading';
import ErrorSnackbar from './components/ErrorSnackbar';
import SuccessSnackbar from './components/SuccessSnackbar';

function App() {
  const checkAuth = useAuthStore(state => state.checkAuth);
  const [isLoading, loader] = useLoading(true);

  useEffect(() => {
    (async () => {
      loader.startLoading();

      await checkAuth();

      loader.stopLoading();
    })();
  }, [checkAuth, loader]);

  if (isLoading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>

      {/* <ErrorDialog /> */}
      <ErrorSnackbar />
      <SuccessSnackbar />
    </>
  );
}

export default App;
