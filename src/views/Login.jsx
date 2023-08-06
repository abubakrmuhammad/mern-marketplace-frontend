import { Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Button,
  Grid,
  Typography,
  TextField,
  Paper,
  Container,
} from '@mui/material';
import * as Yup from 'yup';
import useAuthStore from '../state/stores/authStore';
import Layout from '../components/Layout';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function LoginView() {
  const login = useAuthStore(state => state.login);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      await login(formik.values);
    },
  });

  if (isAuthenticated) return <Navigate to='/' replace />;

  return (
    <Layout>
      <Container maxWidth='xs'>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h5'>Login</Typography>
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
              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={formik.isSubmitting}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
}

export default LoginView;
