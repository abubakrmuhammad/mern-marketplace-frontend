import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import AdminLayout from '../../components/AdminLayout';
import useUsersStore from '../../state/stores/usersStore';
import useLoading from '../../hooks/useLoading';
import { useCallback, useEffect } from 'react';
import DefaultLoader from '../../components/DefaultLoader';
import useConfirmationDialog from '../../hooks/useConfirmationDialog';
import useAppStore from '../../state/stores/appStore';

function AdminUsers() {
  const getAllUsers = useUsersStore(state => state.getAllUsers);
  const users = useUsersStore(state => state.users);
  const deleteUser = useUsersStore(state => state.deleteUser);

  const setSuccess = useAppStore(state => state.setSuccess);

  const [loading, loader] = useLoading();

  const { openDialog, setConfirmationDialogConfirmHandler } =
    useConfirmationDialog();

  const onDeleteClick = useCallback(
    userId => {
      setConfirmationDialogConfirmHandler(async () => {
        const success = await deleteUser(userId);

        if (success) setSuccess('User deleted successfully.');
      });

      openDialog();
    },
    [deleteUser, openDialog, setConfirmationDialogConfirmHandler, setSuccess],
  );

  useEffect(() => {
    (async () => {
      loader.startLoading();

      await getAllUsers();

      loader.stopLoading();
    })();
  }, [getAllUsers, loader]);

  return (
    <AdminLayout>
      <Container>
        <Typography variant='h3' sx={{ mt: 2 }}>
          Manage Users
        </Typography>

        {loading && <DefaultLoader />}

        {users.length === 0 && !loading && (
          <Typography variant='body1' sx={{ mt: 2 }}>
            No users found
          </Typography>
        )}

        <List>
          {users.map((user, index) => (
            <>
              <ListItem
                key={user._id}
                secondaryAction={
                  <IconButton
                    edge='end'
                    color='error'
                    onClick={() => onDeleteClick(user._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>{user.name[0].toUpperCase()}</Avatar>
                </ListItemAvatar>

                <ListItemText primary={user.name} secondary={user.email} />
              </ListItem>
              {index !== users.length - 1 && <Divider />}
            </>
          ))}
        </List>
      </Container>
    </AdminLayout>
  );
}

export default AdminUsers;
