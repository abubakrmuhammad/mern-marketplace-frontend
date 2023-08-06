import { useFormik } from 'formik';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import useCategoriesStore from '../state/stores/categoriesStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../state/stores/authStore';
import useProductsStore from '../state/stores/productsStore';
import useAppStore from '../state/stores/appStore';

function AddProductView() {
  const categories = useCategoriesStore(state => state.categories);
  const getAllCategories = useCategoriesStore(state => state.getAllCategories);
  const createProduct = useProductsStore(state => state.createProduct);
  const user = useAuthStore(state => state.user);
  const setSuccess = useAppStore(state => state.setSuccess);
  const setSuccessCloseHandler = useAppStore(
    state => state.setSuccessCloseHandler,
  );
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
      category: '',
      description: '',
      coverImage: null,
      images: null,
    },
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('title', values.title);
      formData.append('price', values.price);
      formData.append('category', values.category);
      formData.append('description', values.description);
      formData.append('coverImage', values.coverImage);
      values.images.forEach(image => formData.append('images', image));
      formData.append('seller', user._id);

      await createProduct(formData);

      setSuccessCloseHandler(() => navigate('/'));
      setSuccess('Product added successfully.');
    },
  });

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  return (
    <Container maxWidth='sm'>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant='h5'>Add Product</Typography>
        <Typography variant='body2' color='text.secondary'>
          Add a new product to sell
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id='title'
            name='title'
            label='Title'
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            margin='normal'
          />

          <TextField
            fullWidth
            id='price'
            name='price'
            label='Price'
            type='number'
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            margin='normal'
          />

          <FormControl fullWidth margin='normal'>
            <InputLabel htmlFor='category'>Category</InputLabel>
            <Select
              id='category'
              name='category'
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              {categories.map(category => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin='normal'>
            <MuiFileInput
              value={formik.values.coverImage}
              onChange={file => {
                formik.setFieldValue('coverImage', file);
              }}
              placeholder='Select Cover Image'
              helperText='You can select only 1 image'
            />
          </FormControl>

          <FormControl fullWidth margin='normal'>
            <MuiFileInput
              value={formik.values.images}
              onChange={files => {
                formik.setFieldValue('images', files);
              }}
              placeholder='Select Product Images'
              multiple
              helperText='You can select upto 3 images'
            />
          </FormControl>

          <TextField
            fullWidth
            id='description'
            name='description'
            label='Description'
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            margin='normal'
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Adding...' : 'Add Product'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AddProductView;
