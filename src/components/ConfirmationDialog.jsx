import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import useAppStore from '../state/stores/appStore';

function ConfirmationDialog() {
  const confirmationDialogData = useAppStore(
    state => state.confirmationDialogData,
  );

  const {
    open,
    title,
    description,
    confirmText,
    cancelText,
    confirmHandler,
    cancelHandler,
  } = confirmationDialogData;

  return (
    <Dialog maxWidth='xs' open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={cancelHandler}>
          {cancelText}
        </Button>
        <Button onClick={confirmHandler} color='error' variant='contained'>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
