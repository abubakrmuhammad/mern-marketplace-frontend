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
import useAppStore from '../state/stores/appStore';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

function ForgotPasswordView() {
  const forgotPassword = useAuthStore(state => state.forgotPassword);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const setSuccess = useAppStore(state => state.setSuccess);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      const success = await forgotPassword(values.email);

      if (success) setSuccess('An email has been sent to your inbox.');
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
                <Typography variant='h5'>Recover Password</Typography>
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
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={formik.isSubmitting}
                >
                  Recover
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
}

export default ForgotPasswordView;
