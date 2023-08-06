import { create } from 'zustand';

const useAppStore = create(set => ({
  error: null,
  setError: (data = 'Something went wrong!') => set({ error: data }),
}));

export default useAppStore;
