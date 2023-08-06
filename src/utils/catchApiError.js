import useAppStore from '../state/stores/appStore';

export function catchApiError(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      useAppStore.getState().setError(error.response?.data?.message || 'Something went wrong!');

      console.dir(error);
    }
  };
}