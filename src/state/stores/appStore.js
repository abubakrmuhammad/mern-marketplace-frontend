import { create } from 'zustand';

const useAppStore = create(set => ({
  error: null,
  setError: (data = 'Something went wrong!') => set({ error: data }),
  success: null,
  successTimeout: 6000,
  successCloseHandler: () => set({ success: null }),
  setSuccess: (data = 'Success!') => set({ success: data }),
  setSuccessTimeout: timeout => set({ successTimeout: timeout }),
  setSuccessCloseHandler: handler =>
    set({
      successCloseHandler: () => {
        handler && handler();
        set({ success: null });
      },
    }),
}));

export default useAppStore;
