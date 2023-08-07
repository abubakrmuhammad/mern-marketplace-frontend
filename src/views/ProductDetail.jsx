// ProductDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Tooltip,
  IconButton,
  Box,
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import useProductsStore from '../state/stores/productsStore';
import useLoading from '../hooks/useLoading';
import Layout from '../components/Layout';
import { getApiImageUrl } from '../utils/getApiStorageUrl';
import useAuthStore from '../state/stores/authStore';
import useCartStore from '../state/stores/cartStore';
import useAppStore from '../state/stores/appStore';

const ProductDetailView = () => {
  const { slug } = useParams();
  const getProductBySlugOrId = useProductsStore(
    state => state.getProductBySlugOrId,
  );
  const currentProduct = useProductsStore(state => state.currentProduct);
  const setSuccess = useAppStore(state => state.setSuccess);

  const addToCart = useCartStore(state => state.addToCart);

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const [productLoading, productLoader] = useLoading(true);
  const [addToCartLoading, addToCartLoader] = useLoading(false);

  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleOpenLightbox = index => {
    setSelectedImageIndex(index);
    setOpenLightbox(true);
  };

  const handleCloseLightbox = () => {
    setOpenLightbox(false);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) return;

    addToCartLoader.startLoading();

    const success = await addToCart({
      productId: currentProduct.id,
      quantity: 1,
    });

    if (success) setSuccess('Product added to cart successfully.');

    addToCartLoader.stopLoading();
  };

  useEffect(() => {
    (async () => {
      productLoader.startLoading();

      await getProductBySlugOrId(slug);

      productLoader.stopLoading();
    })();
  }, [getProductBySlugOrId, productLoader, slug]);

  if (!currentProduct && !productLoading) {
    return (
      <Layout>
        <Container maxWidth='sm'>
          <Typography variant='h4' gutterBottom align='center'>
            Product not found
          </Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <img
          src={getApiImageUrl(currentProduct?.imageCover)}
          alt={currentProduct?.title}
          style={{ width: '100%', marginBottom: '1rem', borderRadius: '5px' }}
        />

        <Typography variant='h4' gutterBottom>
          {currentProduct?.title}
        </Typography>

        {currentProduct?.images.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {currentProduct?.images.map((image, index) => (
              <img
                key={index}
                src={getApiImageUrl(image)}
                alt={currentProduct?.title}
                style={{
                  width: '100px',
                  height: '100px',
                  margin: '0.5rem',
                  cursor: 'pointer',
                  outline: '2px solid #000',
                  borderRadius: '3px',
                }}
                onClick={() => handleOpenLightbox(index)}
              />
            ))}
          </div>
        )}

        <Typography variant='h6'>Description</Typography>
        <Typography variant='body1' gutterBottom>
          {currentProduct?.description}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
            py: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Box>
              <Typography variant='h6'>
                <AttachMoneyIcon
                  sx={{
                    verticalAlign: 'middle',
                    marginRight: '0.5rem',
                  }}
                />
                Price
              </Typography>
              <Typography variant='body1' gutterBottom>
                ${currentProduct?.price}
              </Typography>
            </Box>

            <Box>
              <Typography variant='h6'>
                <CategoryIcon
                  sx={{
                    verticalAlign: 'middle',
                    marginRight: '0.5rem',
                  }}
                />
                Category
              </Typography>
              <Typography variant='body1' gutterBottom>
                {currentProduct?.category.name}
              </Typography>
            </Box>

            <Box>
              <Typography variant='h6'>
                <StorefrontIcon
                  sx={{
                    verticalAlign: 'middle',
                    marginRight: '0.5rem',
                  }}
                />
                Seller
              </Typography>
              <Typography variant='body1' gutterBottom>
                {currentProduct?.seller.name}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Tooltip
              title={
                isAuthenticated
                  ? ''
                  : 'You need to be logged in to add products to the cart'
              }
            >
              <Button
                variant='contained'
                color='primary'
                onClick={handleAddToCart}
                startIcon={<AddShoppingCartIcon />}
                disableElevation={!isAuthenticated}
                disabled={addToCartLoading}
              >
                {addToCartLoading ? 'Adding to cart...' : 'Add to cart'}
              </Button>
            </Tooltip>
          </Box>
        </Box>

        <Dialog
          open={openLightbox}
          onClose={handleCloseLightbox}
          keepMounted
          maxWidth='md'
          fullWidth
        >
          <DialogTitle>
            <IconButton edge='end' onClick={handleCloseLightbox}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <img
                src={getApiImageUrl(currentProduct?.images[selectedImageIndex])}
                alt={currentProduct?.title}
                style={{ width: '100%', borderRadius: '4px' }}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Paper>
    </Layout>
  );
};

export default ProductDetailView;
