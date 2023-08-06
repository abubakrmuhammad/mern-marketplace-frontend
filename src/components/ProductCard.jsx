import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
} from '@mui/material';
import { getApiImageUrl } from '../utils/getApiStorageUrl';

function ProductCard({ product }) {
  const { title, price, imageCover, category, description, seller } = product;

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
    </Card>
  );
}

export default ProductCard;
