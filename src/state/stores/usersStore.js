import { create } from 'zustand';
import isApiSuccessful from '../../utils/isApiSuccessful';
import api from '../../api/api';
import { catchApiError } from '../../utils/catchApiError';
import useAuthStore from './authStore';

const useUsersStore = create(set => {
  const getAllUsers = async () => {
    const response = await api.get('/users');

    console.log('getAllUsers', response);

    set({
      users: response.data.data.data.filter(
        user => user._id !== useAuthStore.getState().user._id,
      ),
    });

    return isApiSuccessful(response);
  };

  const createUser = async data => {
    const response = await api.post('/users', data);

    console.log('createUser', response);

    await getAllUsers();

    return isApiSuccessful(response);
  };

  const deleteUser = async id => {
    const response = await api.delete(`/users/${id}`);

    console.log('deleteUser', response);

    await getAllUsers();

    return isApiSuccessful(response);
  };

  return {
    users: [],
    getAllUsers: catchApiError(getAllUsers),
    deleteUser: catchApiError(deleteUser),
    createUser: catchApiError(createUser),
  };
});

export default useUsersStore;
