import { useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
} from '@mui/material';
import useProductsStore from '../state/stores/productsStore';
import useAppStore from '../state/stores/appStore';
import { getAllProducts } from '../api/products';
import { getApiImageUrl } from '../utils/getApiStorageUrl';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const products = useProductsStore(state => state.products);
  const setProducts = useProductsStore(state => state.setProducts);
  const setError = useAppStore(state => state.setError);

  useEffect(() => {
    getAllProducts()
      .then(({ data }) => setProducts(data.data.data))
      .catch(err => setError(err.response.data.message));
  }, [setProducts, setError]);

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

export default Home;
