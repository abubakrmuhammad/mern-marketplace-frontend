import api from './api';

export const getAllProducts = async () => api.get('/products');

export const getProductById = async (id) => api.get(`/products/${id}`);

export const createProduct = async (data) => api.post('/products', data);

export const updateProductById = async (id, data) => api.put(`/products/${id}`, data);

export const deleteProductById = async (id) => api.delete(`/products/${id}`);