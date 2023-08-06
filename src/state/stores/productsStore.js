import { create } from 'zustand';

const useProductsStore = create((set) => ({
  products: [],
  setProducts: (data) => set({ products: data }),
}));

export default useProductsStore;
