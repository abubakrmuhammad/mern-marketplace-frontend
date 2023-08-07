// CartPage.jsx
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material';
import useCartStore from '../state/stores/cartStore';
import Layout from '../components/Layout';
import { useCallback, useEffect, useState } from 'react';
import useLoading from '../hooks/useLoading';
import DefaultLoader from '../components/DefaultLoader';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeleteIcon from '@mui/icons-material/Delete';
import { getApiImageUrl } from '../utils/getApiStorageUrl';
import useAppStore from '../state/stores/appStore';
import useCheckoutStore from '../state/stores/checkoutStore';
import useAuthStore from '../state/stores/authStore';

const CartView = () => {
  const cart = useCartStore(state => state.cart);
  const getCart = useCartStore(state => state.getCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const clearCart = useCartStore(state => state.clearCart);

  const setSuccess = useAppStore(state => state.setSuccess);

  const createCheckout = useCheckoutStore(state => state.createCheckout);

  const user = useAuthStore(state => state.user);

  const [cartLoading, cartLoader] = useLoading();
  const [currentRemovingId, setCurrentRemovingId] = useState(null);
  const [checkoutLoading, checkoutLoader] = useLoading();

  const cartItems = cart?.items;
  const cartTotal =
    cart?.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    ) || 0;

  useEffect(() => {
    (async () => {
      cartLoader.startLoading();

      await getCart();

      cartLoader.stopLoading();
    })();
  }, [cartLoader, getCart]);

  const removeFromCartHandler = useCallback(
    async productId => {
      setCurrentRemovingId(productId);

      const success = await removeFromCart(productId);

      if (success) setSuccess('Product removed from cart successfully.');

      setCurrentRemovingId(null);
    },
    [removeFromCart, setSuccess],
  );

  const checkoutHandler = useCallback(async () => {
    checkoutLoader.startLoading();

    const data = {
      user: user._id,
      products: cartItems.map(({ product, quantity }) => ({
        product: product._id,
        quantity,
        price: product.price,
      })),
      totalAmount: cartTotal,
    };

    const success = await createCheckout(data);

    if (success) {
      const cartSuccess = await clearCart();

      if (cartSuccess) setSuccess('Checkout created successfully.');
    }

    checkoutLoader.stopLoading();
  }, [
    cartItems,
    cartTotal,
    checkoutLoader,
    clearCart,
    createCheckout,
    setSuccess,
    user._id,
  ]);

  return (
    <Layout>
      <Container maxWidth='md'>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant='h4' gutterBottom>
            Your Cart
          </Typography>

          {cartLoading && <DefaultLoader />}

          {!cartItems.length && !cartLoading ? (
            <Typography variant='body1' gutterBottom>
              Your cart is empty.
            </Typography>
          ) : (
            !cartLoading && (
              <>
                <List>
                  {cartItems?.map(({ product, quantity }, index) => (
                    <>
                      <ListItem
                        key={product._id}
                        secondaryAction={
                          currentRemovingId === product._id ? (
                            <CircularProgress color='error' />
                          ) : (
                            <IconButton
                              edge='end'
                              color='error'
                              onClick={() => removeFromCartHandler(product._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )
                        }
                      >
                        <ListItemAvatar>
                          <Avatar src={getApiImageUrl(product.imageCover)} />
                        </ListItemAvatar>

                        <ListItemText
                          primary={product.title}
                          secondary={`$${product.price} x ${quantity}`}
                        />
                      </ListItem>
                      {index !== cartItems.length - 1 && <Divider />}
                    </>
                  ))}
                </List>

                <Typography variant='h6' gutterBottom>
                  Total: ${cartTotal}
                </Typography>

                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<ShoppingCartCheckoutIcon />}
                  onClick={checkoutHandler}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? 'Checking out...' : 'Checkout'}
                </Button>
              </>
            )
          )}
        </Paper>
      </Container>
    </Layout>
  );
};

export default CartView;
