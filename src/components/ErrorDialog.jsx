import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import useAppStore from '../state/stores/appStore';

const ErrorDialog = () => {
  const error = useAppStore(state => state.error);
  const setError = useAppStore(state => state.setError);

  const handleCloseError = () => setError(null);

  return (
    <Dialog open={!!error} onClose={handleCloseError} >
      <DialogTitle>Oops!</DialogTitle>
      <DialogContent>{error}</DialogContent>
      <DialogActions>
        <Button onClick={handleCloseError}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
