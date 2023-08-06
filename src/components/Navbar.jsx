import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Container,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useAuthStore from '../state/stores/authStore';
import { useCallback } from 'react';
import useLoading from '../hooks/useLoading';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isAdmin = useAuthStore(state => state.isAdmin);
  const logout = useAuthStore(state => state.logout);

  const navigate = useNavigate();

  const [loggingOut, loggingOutLoader] = useLoading();

  const logoutHandler = useCallback(async () => {
    loggingOutLoader.startLoading();

    await logout();

    loggingOutLoader.stopLoading();

    navigate('/login');
  }, [loggingOutLoader, logout, navigate]);

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar>
          <Typography
            variant='h6'
            component={RouterLink}
            to='/'
            sx={{ flexGrow: 1, color: 'white', textDecoration: 'none' }}
          >
            MUI Buy & Sell
          </Typography>

          {isAdmin && (
            <>
              <Link
                component={RouterLink}
                to='/admin'
                sx={{ color: 'white', ml: 2 }}
              >
                Admin
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link
                component={RouterLink}
                to='/profile'
                sx={{ color: 'white', ml: 2 }}
              >
                My Account
              </Link>

              <Button
                variant='text'
                onClick={logoutHandler}
                sx={{
                  ml: 2,
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
                }}
              >
                {loggingOut ? 'Logging out...' : 'Logout'}
              </Button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link
                component={RouterLink}
                to='/'
                sx={{ color: 'white', ml: 2 }}
              >
                Products
              </Link>

              <Link
                component={RouterLink}
                to='/login'
                sx={{ color: 'white', ml: 2 }}
              >
                Login
              </Link>
              <Link
                component={RouterLink}
                to='/signup'
                sx={{ color: 'white', ml: 2 }}
              >
                Signup
              </Link>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
