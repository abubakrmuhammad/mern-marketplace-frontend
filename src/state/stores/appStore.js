import { create } from 'zustand';

const useAppStore = create((set, get) => ({
  drawerWidth: 320,
  setDrawerWidth: width => set({ drawerWidth: width }),
  error: null,
  setError: (data = 'Something went wrong!') => set({ error: data }),
  success: null,
  successTimeout: 6000,
  successCloseHandler: () =>
    set({
      success: null,
      setSuccessCloseHandler: () => set({ success: null }),
    }),
  setSuccess: (data = 'Success!') => set({ success: data }),
  setSuccessTimeout: timeout => set({ successTimeout: timeout }),
  setSuccessCloseHandler: handler =>
    set({
      successCloseHandler: () => {
        handler && handler();
        set({ success: null });
      },
    }),
  confirmationDialogData: {
    open: false,
    title: 'Are you sure?',
    description:
      'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    openDialog: () =>
      set({
        confirmationDialogData: { ...get().confirmationDialogData, open: true },
      }),
    confirmHandler: () => {
      set({
        confirmationDialogData: {
          ...get().confirmationDialogData,
          open: false,
          confirmHandler: () =>
            set({
              confirmationDialogData: {
                ...get().confirmationDialogData,
                open: false,
              },
            }),
        },
      });
    },
    cancelHandler: () => {
      set({
        confirmationDialogData: {
          ...get().confirmationDialogData,
          open: false,
          cancelHandler: () =>
            set({
              confirmationDialogData: {
                ...get().confirmationDialogData,
                open: false,
              },
            }),
        },
      });
    },
  },
  setConfirmationDialogData: data => set({ confirmationDialogData: data }),
  setConfirmationDialogConfirmHandler: handler =>
    set({
      confirmationDialogData: {
        ...get().confirmationDialogData,
        confirmHandler: () => {
          handler && handler();
          set({
            confirmationDialogData: {
              ...get().confirmationDialogData,
              open: false,
            },
          });
        },
      },
    }),
}));

export default useAppStore;
