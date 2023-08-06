import { create } from 'zustand';
import { catchApiError } from '../../utils/catchApiError';
import api from '../../api/api';

const useProductsStore = create((set) => {
  const getAllProducts = async () => {
    const response = await api.get('/products');

    console.log('getAllProducts', response);

    set({ products: response.data.data.data });
  };

  return {
    products: [],
    getAllProducts: catchApiError(getAllProducts),
  }
});

export default useProductsStore;
