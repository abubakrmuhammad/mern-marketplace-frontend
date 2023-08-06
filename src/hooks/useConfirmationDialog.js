import useAppStore from '../state/stores/appStore';

function useConfirmationDialog() {
  const confirmationDialogData = useAppStore(
    state => state.confirmationDialogData,
  );
  const setConfirmationDialogData = useAppStore(
    state => state.setConfirmationDialogData,
  );
  const setConfirmationDialogConfirmHandler = useAppStore(
    state => state.setConfirmationDialogConfirmHandler,
  );

  return {
    openDialog: confirmationDialogData.openDialog,
    confirmationDialogData,
    setConfirmationDialogData,
    setConfirmationDialogConfirmHandler,
  };
}

export default useConfirmationDialog;
