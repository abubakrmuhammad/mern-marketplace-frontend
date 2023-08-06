import { create } from 'zustand';
import { catchApiError } from '../../utils/catchApiError';
import api from '../../api/api';

const useProductsStore = create(set => {
  const getAllProducts = async () => {
    const response = await api.get('/products');

    console.log('getAllProducts', response);

    set({ products: response.data.data.data });
  };

  const createProduct = async data => {
    const response = await api.post('/products', data);

    console.log('createProduct', response);
  };

  return {
    products: [],
    getAllProducts: catchApiError(getAllProducts),
    createProduct: catchApiError(createProduct),
  };
});

export default useProductsStore;
