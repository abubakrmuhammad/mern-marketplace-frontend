import { useEffect } from 'react';
import { Typography, Grid, Container } from '@mui/material';
import useProductsStore from '../state/stores/productsStore';
import ProductCard from '../components/ProductCard';
import useLoading from '../hooks/useLoading';
import DefaultLoader from '../components/DefaultLoader';
import useAuthStore from '../state/stores/authStore';
import Layout from '../components/Layout';

const HomeView = () => {
  const products = useProductsStore(state => state.products);
  const getAllProducts = useProductsStore(state => state.getAllProducts);
  const user = useAuthStore(state => state.user);

  const [loading, loader] = useLoading(true);

  useEffect(() => {
    getAllProducts().then(() => loader.stopLoading());
  }, [getAllProducts, loader]);

  return (
    <Layout>
      <Container>
        <Typography variant='h3' gutterBottom>
          Welcome to MUI Buy & Sell
        </Typography>
        <Typography variant='body1'>
          Browse through our wide range of products and start buying or selling
          today!
        </Typography>
        <Grid container spacing={2} mt={4}>
          {loading && <DefaultLoader />}
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard
                product={product}
                deletable={product.seller._id === user?._id}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default HomeView;
