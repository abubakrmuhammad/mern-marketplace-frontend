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
import useCategoriesStore from '../../state/stores/categoriesStore';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AdminCategories() {
  const categories = useCategoriesStore(state => state.categories);
  const getAllCategories = useCategoriesStore(state => state.getAllCategories);
  const deleteCategory = useCategoriesStore(state => state.deleteCategory);
  const setSuccess = useAppStore(state => state.setSuccess);

  const [loading, loader] = useLoading(true);

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const { openDialog, setConfirmationDialogConfirmHandler } =
    useConfirmationDialog();

  const onDeleteClick = useCallback(
    id => {
      setConfirmationDialogConfirmHandler(async () => {
        const success = await deleteCategory(id);

        if (success) setSuccess('Category deleted successfully.');
      });

      openDialog();
    },
    [
      deleteCategory,
      openDialog,
      setConfirmationDialogConfirmHandler,
      setSuccess,
    ],
  );

  useEffect(() => {
    (async () => {
      loader.startLoading();

      await getAllCategories();

      loader.stopLoading();
    })();
  }, [getAllCategories, loader]);

  return (
    <AdminLayout>
      <Container>
        <AddCategoryDialog
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
          <Typography variant='h3' sx={{ mt: 2, mb: 2 }}>
            Manage Product Categories
          </Typography>

          <Button
            variant='outlined'
            startIcon={<AddIcon />}
            onClick={() => setAddDialogOpen(true)}
          >
            Add Category
          </Button>
        </Box>

        {loading && <DefaultLoader />}

        {categories.length === 0 && !loader && (
          <Typography variant='h6'>No Categories found</Typography>
        )}

        <List>
          {categories.map((category, index) => (
            <>
              <ListItem
                key={category._id}
                secondaryAction={
                  <IconButton
                    edge='end'
                    color='error'
                    onClick={() => onDeleteClick(category._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>{category.name[0].toUpperCase()}</Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={category.name}
                  secondary={category.description}
                />
              </ListItem>

              {index !== categories.length - 1 && <Divider />}
            </>
          ))}
        </List>
      </Container>
    </AdminLayout>
  );
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string(),
});

function AddCategoryDialog({ open, handleClose }) {
  const createCategory = useCategoriesStore(state => state.createCategory);
  const setSuccess = useAppStore(state => state.setSuccess);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      const success = await createCategory(formik.values);

      if (!success) return;

      handleClose();
      setSuccess('Category created successfully.');
    },
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Create Category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a new product category to the system
            </DialogContentText>

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
                  label='Description'
                  variant='outlined'
                  {...formik.getFieldProps('description')}
                  error={
                    formik.touched.description && !!formik.errors.description
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
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
              {formik.isSubmitting ? 'Creating...' : 'Create Category'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AdminCategories;
