import { create } from 'zustand';
import api from '../../api/api';
import { catchApiError } from '../../utils/catchApiError';
import isApiSuccessful from '../../utils/isApiSuccessful';

const useAuthStore = create(set => {
  const checkAuth = async () => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (!token) return;

    const response = await api.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('checkAuth', response);

    set({
      user: response.data.data.data,
      isAuthenticated: true,
      isAdmin: response.data.data.data.role === 'admin',
    });

    return isApiSuccessful(response);
  };

  const signup = async ({ name, email, password, passwordConfirm }) => {
    const response = await api.post('/users/signup', {
      name,
      email,
      password,
      passwordConfirm,
      role: 'user',
    });

    console.log('signup', response);

    set({
      user: response.data.data.user,
      isAuthenticated: true,
      isAdmin: response.data.data.user.role === 'admin',
    });

    localStorage.setItem('token', JSON.stringify(response.data.token));

    return isApiSuccessful(response);
  };

  const login = async ({ email, password }) => {
    const response = await api.post('/users/login', { email, password });

    console.log('login', response);

    set({
      user: response.data.data.user,
      isAuthenticated: true,
      isAdmin: response.data.data.user.role === 'admin',
    });

    localStorage.setItem('token', JSON.stringify(response.data.token));

    return isApiSuccessful(response);
  };

  const forgotPassword = async email => {
    const response = await api.post('/users/forgotPassword', { email });

    console.log('forgotPassword', response);

    return isApiSuccessful(response);
  };

  const logout = async () => {
    const response = await api.get('/users/logout');

    console.log('logout', response);

    set({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
    });

    localStorage.removeItem('token');

    return isApiSuccessful(response);
  };

  return {
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    checkAuth: catchApiError(checkAuth),
    signup: catchApiError(signup),
    login: catchApiError(login),
    logout: catchApiError(logout),
    forgotPassword: catchApiError(forgotPassword),
  };
});

export default useAuthStore;
