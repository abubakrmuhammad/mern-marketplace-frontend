import { create } from 'zustand';
import { catchApiError } from '../../utils/catchApiError';
import api from '../../api/api';

const useCategoriesStore = create((set, get) => {
  const getAllCategories = async () => {
    const response = await api.get('/categories');

    console.log('getAllCategories', response);

    set({ categories: response.data.data.data });
  };

  const createCategory = async data => {
    const response = await api.post('/categories', data);

    console.log('createCategory', response);

    const categories = [...get().categories, response.data.data.data];

    set({ categories });
  };

  const deleteCategory = async id => {
    const response = await api.delete(`/categories/${id}`);

    console.log('deleteCategory', response);

    const categories = get().categories.filter(category => category._id !== id);

    set({ categories });
  };

  return {
    categories: [],
    getAllCategories: catchApiError(getAllCategories),
    createCategory: catchApiError(createCategory),
    deleteCategory: catchApiError(deleteCategory),
  };
});

export default useCategoriesStore;
