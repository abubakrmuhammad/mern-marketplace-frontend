import { Snackbar, Alert } from '@mui/material';
import useAppStore from '../state/stores/appStore';

const SuccessSnackbar = () => {
  const success = useAppStore(state => state.success);
  const successCloseHandler = useAppStore(state => state.successCloseHandler);
  const successTimeout = useAppStore(state => state.successTimeout);

  return (
    <Snackbar
      open={!!success}
      autoHideDuration={successTimeout}
      onClose={successCloseHandler}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={successCloseHandler}
        severity='success'
        sx={{ width: '100%' }}
      >
        {success}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
