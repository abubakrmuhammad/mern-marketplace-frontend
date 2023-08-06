import {
  Container,
  Avatar,
  Typography,
  Box,
  Grid,
  Button,
} from '@mui/material';
import useAuthStore from '../state/stores/authStore';
import useProductsStore from '../state/stores/productsStore';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import useLoading from '../hooks/useLoading';
import DefaultLoader from '../components/DefaultLoader';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function ProfileView() {
  const user = useAuthStore(state => state.user);
  const userProducts = useProductsStore(state => state.userProducts);
  const getAllUserProducts = useProductsStore(
    state => state.getAllUserProducts,
  );

  const [productsLoading, productsLoader] = useLoading(true);
  const [ordersLoading, ordersLoader] = useLoading(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      productsLoader.startLoading();
      await getAllUserProducts();
      productsLoader.stopLoading();
    })();
  }, [getAllUserProducts, productsLoader]);

  useEffect(() => {
    (async () => {
      ordersLoader.startLoading();
      // await getAllUserOrders();
      ordersLoader.stopLoading();
    })();
  }, [ordersLoader]);

  return (
    <Layout>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ width: 100, height: 100, fontSize: 56, mt: 2 }}>
            {user.name[0].toUpperCase()}
          </Avatar>
          <Typography variant='h5' sx={{ mt: 2 }}>
            {user.name}
          </Typography>
          <Typography variant='body1'>{user.email}</Typography>
        </Box>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography variant='h6'>My Products</Typography>
            {productsLoading && <DefaultLoader />}
            {userProducts.length === 0 && !productsLoader && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  mt: 2,
                }}
              >
                <Typography variant='h6'>No products found</Typography>
                <Button
                  variant='text'
                  color='primary'
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/sell')}
                >
                  Add Product
                </Button>
              </Box>
            )}
            <Grid container spacing={2}>
              {userProducts.map(product => (
                <Grid item xs={12} sm={6} key={product._id}>
                  <ProductCard
                    product={product}
                    deletable={product.seller._id === user._id}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h6'>My Orders</Typography>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default ProfileView;
