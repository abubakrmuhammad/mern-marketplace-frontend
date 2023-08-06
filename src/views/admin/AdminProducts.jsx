import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdminLayout from '../../components/AdminLayout';
import useLoading from '../../hooks/useLoading';
import { useEffect } from 'react';
import DefaultLoader from '../../components/DefaultLoader';
import useProductsStore from '../../state/stores/productsStore';
import { Grid } from '@mui/material';
import ProductCard from '../../components/ProductCard';

function AdminProducts() {
  const products = useProductsStore(state => state.products);
  const getAllProducts = useProductsStore(state => state.getAllProducts);
  const [productsLoading, productsLoader] = useLoading(true);

  useEffect(() => {
    (async () => {
      productsLoader.startLoading();

      await getAllProducts();

      productsLoader.stopLoading();
    })();
  }, [getAllProducts, productsLoader]);
  return (
    <AdminLayout>
      <Container>
        <Typography variant='h3' sx={{ mt: 2, mb: 2 }}>
          Manage Products
        </Typography>
        <Grid item xs={12} md={6}>
          {productsLoading && <DefaultLoader />}

          {products.length === 0 && !productsLoader && (
            <Typography variant='h6'>No products found</Typography>
          )}

          <Grid container spacing={2}>
            {products.map(product => (
              <Grid item xs={12} sm={6} key={product._id}>
                <ProductCard product={product} deletable />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  );
}

export default AdminProducts;
