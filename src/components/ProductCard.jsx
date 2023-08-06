import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
  CardActions,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getApiImageUrl } from '../utils/getApiStorageUrl';
import useConfirmationDialog from '../hooks/useConfirmationDialog';
import { useCallback } from 'react';
import useProductsStore from '../state/stores/productsStore';
import useAppStore from '../state/stores/appStore';

function ProductCard({ product, deletable = false }) {
  const { title, price, imageCover, category, description, seller } = product;

  const { openDialog, setConfirmationDialogConfirmHandler } =
    useConfirmationDialog();
  const deleteUserProduct = useProductsStore(state => state.deleteUserProduct);
  const setSuccess = useAppStore(state => state.setSuccess);

  const onDeleteClick = useCallback(() => {
    setConfirmationDialogConfirmHandler(async () => {
      const success = await deleteUserProduct(product._id);

      if (success) setSuccess('Product deleted successfully.');
    });

    openDialog();
  }, [
    deleteUserProduct,
    openDialog,
    product._id,
    setConfirmationDialogConfirmHandler,
    setSuccess,
  ]);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{seller.name[0]}</Avatar>}
        title={seller.name}
        subheader={category.name}
      />

      <CardMedia
        component='img'
        height='200'
        image={getApiImageUrl(imageCover)}
        alt={title}
      />

      <CardContent>
        <Typography variant='h6' gutterBottom>
          {title}
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Price: ${price}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {description}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {deletable && (
          <IconButton color='error' onClick={onDeleteClick}>
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
