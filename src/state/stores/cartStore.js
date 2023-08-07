import { create } from 'zustand';
import isApiSuccessful from '../../utils/isApiSuccessful';
import api from '../../api/api';
import { catchApiError } from '../../utils/catchApiError';

const useCartStore = create((set, get) => {
  const getCart = async () => {
    const response = await api.get('/cart');

    console.log('getCart', response);

    set({ cart: response.data.data.cart });

    return isApiSuccessful(response);
  };

  const addToCart = async data => {
    const response = await api.post('/cart', data);

    console.log('addToCart', response);

    await getCart();

    return isApiSuccessful(response);
  };

  const removeFromCart = async id => {
    const response = await api.delete('/cart', {
      data: { productId: id },
    });

    console.log('removeFromCart', response);

    await getCart();

    return isApiSuccessful(response);
  };

  const totalItemsCount = () =>
    get().cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return {
    cart: null,
    totalItemsCount,
    getCart: catchApiError(getCart),
    addToCart: catchApiError(addToCart),
    removeFromCart: catchApiError(removeFromCart),
  };
});

export default useCartStore;
