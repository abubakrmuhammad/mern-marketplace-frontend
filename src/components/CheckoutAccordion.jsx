import {
  Avatar,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { getApiImageUrl } from '../utils/getApiStorageUrl';

function CheckoutAccordion({ checkout, deletable = false }) {
  const { products } = checkout;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>
          {new Date(checkout.createdAt).toLocaleDateString()} -{' '}
          {new Date(checkout.createdAt).toLocaleTimeString()} {`//`} $
          {checkout.totalAmount}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {products.map(({ product, price, quantity }, index) => (
            <>
              <ListItem
                key={product._id}
                secondaryAction={
                  deletable && (
                    <IconButton
                      edge='end'
                      color='error'
                      // onClick={() => onDeleteClick(user._id)}
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
                  secondary={`$${price} x ${quantity}`}
                />
              </ListItem>
              {index !== products.length - 1 && <Divider />}
            </>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

export default CheckoutAccordion;
