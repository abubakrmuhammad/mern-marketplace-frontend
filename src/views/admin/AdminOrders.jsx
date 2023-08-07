import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdminLayout from '../../components/AdminLayout';
import useLoading from '../../hooks/useLoading';
import { useEffect } from 'react';
import DefaultLoader from '../../components/DefaultLoader';
import useCheckoutStore from '../../state/stores/checkoutStore';
import CheckoutAccordion from '../../components/CheckoutAccordion';

function AdminOrders() {
  const getAllCheckouts = useCheckoutStore(state => state.getAllCheckouts);
  const allCheckouts = useCheckoutStore(state => state.allCheckouts);

  const [loading, loader] = useLoading();

  useEffect(() => {
    (async () => {
      loader.startLoading();

      await getAllCheckouts();

      loader.stopLoading();
    })();
  }, [getAllCheckouts, loader]);

  return (
    <AdminLayout>
      <Container>
        <Typography variant='h3' sx={{ mt: 2 }}>
          Manage Checkouts
        </Typography>

        {loading && <DefaultLoader />}

        {allCheckouts.length === 0 && !loading && (
          <Typography variant='body1' sx={{ mt: 2 }}>
            No Checkouts found
          </Typography>
        )}

        {allCheckouts.map(checkout => (
          <CheckoutAccordion checkout={checkout} key={checkout._id} adminView />
        ))}
      </Container>
    </AdminLayout>
  );
}

export default AdminOrders;
