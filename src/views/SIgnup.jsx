import { Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Button,
  Grid,
  Typography,
  TextField,
  Container,
  Paper,
} from '@mui/material';
import * as Yup from 'yup';
import useAuthStore from '../state/stores/authStore';
import Layout from '../components/Layout';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUpView = () => {
  const signup = useAuthStore(state => state.signup);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      await signup(formik.values);
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
                <Typography variant='h5'>Signup</Typography>
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Confirm Password'
                  type='password'
                  variant='outlined'
                  {...formik.getFieldProps('passwordConfirm')}
                  error={
                    formik.touched.passwordConfirm &&
                    !!formik.errors.passwordConfirm
                  }
                  helperText={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={formik.isSubmitting}
                >
                  Signup
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
};

export default SignUpView;
