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
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getApiImageUrl } from '../utils/getApiStorageUrl';

function CheckoutAccordion({ checkout, adminView = false }) {
  const { products } = checkout;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography>
            {new Date(checkout.createdAt).toLocaleDateString()} -{' '}
            {new Date(checkout.createdAt).toLocaleTimeString()} {`//`} $
            {checkout.totalAmount}
          </Typography>

          {adminView && (
            <Box sx={{ ml: 1 }}>
              • by <b>{checkout.user.name}</b>
            </Box>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {products.map(({ product, price, quantity }, index) => (
            <>
              <ListItem key={product._id}>
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
