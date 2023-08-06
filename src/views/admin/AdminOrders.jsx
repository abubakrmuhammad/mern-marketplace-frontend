import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdminLayout from '../../components/AdminLayout';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Divider from '@mui/material/Divider';
// import useUsersStore from '../../state/stores/usersStore';
// import useLoading from '../../hooks/useLoading';
// import { useCallback, useEffect } from 'react';
// import DefaultLoader from '../../components/DefaultLoader';
// import useConfirmationDialog from '../../hooks/useConfirmationDialog';
// import useAppStore from '../../state/stores/appStore';

function AdminOrders() {
  // const getAllUsers = useUsersStore(state => state.getAllUsers);
  // const users = useUsersStore(state => state.users);

  // const [loading, loader] = useLoading();

  // useEffect(() => {
  //   (async () => {
  //     loader.startLoading();

  //     await getAllUsers();

  //     loader.stopLoading();
  //   })();
  // }, [getAllUsers, loader]);

  return (
    <AdminLayout>
      <Container>
        <Typography variant='h3' sx={{ mt: 2 }}>
          Manage Checkouts
        </Typography>

        {/* {loading && <DefaultLoader />} */}

        {/* {users.length === 0 && !loading && (
          <Typography variant='body1' sx={{ mt: 2 }}>
            No Orders found
          </Typography>
        )} */}
      </Container>
    </AdminLayout>
  );
}

export default AdminOrders;
