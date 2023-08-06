import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { getApiImageUrl } from '../utils/getApiStorageUrl';

function ProductCard({ product }) {
  const { title, price, imageCover, description } = product;

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component='img'
          height='200'
          image={getApiImageUrl(imageCover)}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Price: ${price}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
