import { useEffect } from 'react';
import { Typography, Grid, Container } from '@mui/material';
import useProductsStore from '../state/stores/productsStore';
import ProductCard from '../components/ProductCard';

const HomeView = () => {
  const products = useProductsStore(state => state.products);
  const getAllProducts = useProductsStore(state => state.getAllProducts);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <Container>
      <Typography variant='h3' gutterBottom>
        Welcome to MUI Buy & Sell
      </Typography>
      <Typography variant='body1'>
        Browse through our wide range of products and start buying or selling
        today!
      </Typography>

      <Grid container spacing={2} mt={4}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomeView;
