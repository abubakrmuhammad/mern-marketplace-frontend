import { create } from 'zustand';
import api from '../../api/api';
import isApiSuccessful from '../../utils/isApiSuccessful';
import { catchApiError } from '../../utils/catchApiError';
import useAuthStore from './authStore';

const useCheckoutStore = create(set => {
  const createCheckout = async data => {
    const response = await api.post('/checkouts', data);

    console.log('createCheckout', response);

    return isApiSuccessful(response);
  };

  const getAllCheckouts = async () => {
    const response = await api.get('/checkouts');

    console.log('getAllCheckouts', response);

    set({ allCheckouts: response.data.data.data });

    return isApiSuccessful(response);
  };

  const getCheckoutById = async id => {
    const response = await api.get(`/checkouts/${id}`);

    console.log('getCheckoutById', response);

    set({ currentCheckout: response.data.data });

    return isApiSuccessful(response);
  };

  const deleteCheckout = async id => {
    const response = await api.delete(`/checkouts/${id}`);

    console.log('deleteCheckout', response);

    await getAllCheckouts();

    return isApiSuccessful(response);
  };

  const getAllUserCheckouts = async () => {
    const response = await api.get(
      `/users/${useAuthStore.getState().user._id}/checkouts`,
    );
    console.log('getAllUserCheckouts', response);

    set({
      userCheckouts: response.data.data.sort(
        (a, b) => b.createdAt - a.createdAt,
      ),
    });

    return isApiSuccessful(response);
  };

  return {
    currentCheckout: {},
    allCheckouts: [],
    userCheckouts: [],
    createCheckout: catchApiError(createCheckout),
    getAllCheckouts: catchApiError(getAllCheckouts),
    getCheckoutById: catchApiError(getCheckoutById),
    deleteCheckout: catchApiError(deleteCheckout),
    getAllUserCheckouts: catchApiError(getAllUserCheckouts),
  };
});

export default useCheckoutStore;
