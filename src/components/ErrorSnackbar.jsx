import { Snackbar, Alert } from '@mui/material';
import useAppStore from '../state/stores/appStore';

const ErrorSnackbar = () => {
  const error = useAppStore(state => state.error);
  const setError = useAppStore(state => state.setError);

  const handleCloseError = () => setError(null);

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={10000}
      onClose={handleCloseError}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleCloseError} severity='error' sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
