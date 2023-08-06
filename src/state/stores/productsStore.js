import { create } from 'zustand';
import { catchApiError } from '../../utils/catchApiError';
import api from '../../api/api';
import useAuthStore from './authStore';
import isApiSuccessful from '../../utils/isApiSuccessful';

const useProductsStore = create(set => {
  const getAllProducts = async () => {
    const response = await api.get('/products');

    console.log('getAllProducts', response);

    set({ products: response.data.data.data });

    return isApiSuccessful(response);
  };

  const createProduct = async data => {
    const response = await api.post('/products', data);

    console.log('createProduct', response);

    await getAllProducts();

    return isApiSuccessful(response);
  };

  const getAllUserProducts = async () => {
    const response = await api.get(
      `/users/${useAuthStore.getState().user._id}/products`,
    );

    console.log('getAllUserProducts', response);

    set({ userProducts: response.data.data });

    return isApiSuccessful(response);
  };

  const deleteUserProduct = async id => {
    const response = await api.delete(`/users/products/${id}`);

    console.log('deleteUserProduct', response);

    await getAllProducts();
    await getAllUserProducts();

    return isApiSuccessful(response);
  };

  return {
    products: [],
    userProducts: [],
    getAllProducts: catchApiError(getAllProducts),
    createProduct: catchApiError(createProduct),
    getAllUserProducts: catchApiError(getAllUserProducts),
    deleteUserProduct: catchApiError(deleteUserProduct),
  };
});

export default useProductsStore;
