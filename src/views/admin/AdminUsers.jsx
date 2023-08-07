import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AdminLayout from '../../components/AdminLayout';
import useLoading from '../../hooks/useLoading';
import { useCallback, useEffect, useState } from 'react';
import DefaultLoader from '../../components/DefaultLoader';
import useConfirmationDialog from '../../hooks/useConfirmationDialog';
import useAppStore from '../../state/stores/appStore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useUsersStore from '../../state/stores/usersStore';

function AdminUsers() {
  const getAllUsers = useUsersStore(state => state.getAllUsers);
  const users = useUsersStore(state => state.users);
  const deleteUser = useUsersStore(state => state.deleteUser);

  const setSuccess = useAppStore(state => state.setSuccess);

  const [loading, loader] = useLoading();

  const [addDialogOpen, setAddDialogOpen] = useState(false);

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
        <AddUserDialog
          open={addDialogOpen}
          handleClose={() => setAddDialogOpen(false)}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h3' sx={{ mt: 2 }}>
            Manage Users
          </Typography>

          <Button
            variant='outlined'
            startIcon={<AddIcon />}
            onClick={() => setAddDialogOpen(true)}
          >
            Add User
          </Button>
        </Box>

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

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

function AddUserDialog({ open, handleClose }) {
  const createUser = useUsersStore(state => state.createUser);
  const setSuccess = useAppStore(state => state.setSuccess);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      const success = await createUser({
        ...values,
        passwordConfirm: values.password,
        role: 'user',
      });

      if (!success) return;

      handleClose();
      setSuccess('User created successfully.');
    },
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Create User</DialogTitle>
          <DialogContent>
            <DialogContentText>Add a new user to the system</DialogContentText>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Name'
                  variant='outlined'
                  {...formik.getFieldProps('name')}
                  error={formik.touched.name && !!formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Email'
                  variant='outlined'
                  {...formik.getFieldProps('email')}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Password'
                  type='password'
                  variant='outlined'
                  {...formik.getFieldProps('password')}
                  error={formik.touched.password && !!formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Creating...' : 'Create User'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AdminUsers;
