import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Container,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';
import { Logout, Person2, Add } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import useAuthStore from '../state/stores/authStore';
import { useCallback, useState } from 'react';
import useLoading from '../hooks/useLoading';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isAdmin = useAuthStore(state => state.isAdmin);
  const logout = useAuthStore(state => state.logout);

  const navigate = useNavigate();

  const [loggingOut, loggingOutLoader] = useLoading();
  const [anchorEl, setAnchorEl] = useState(null);

  const logoutHandler = useCallback(async () => {
    loggingOutLoader.startLoading();

    await logout();

    loggingOutLoader.stopLoading();

    navigate('/login');
  }, [loggingOutLoader, logout, navigate]);

  const openAccountMenu = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);

  const closeAccountMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

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
              <Button
                variant='text'
                onClick={openAccountMenu}
                sx={{
                  ml: 2,
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
                }}
              >
                My Account
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    fontSize: 14,
                    ml: 1,
                  }}
                >
                  {user?.name?.[0]}
                </Avatar>
              </Button>

              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={closeAccountMenu}
              >
                <MenuItem
                  onClick={() => {
                    navigate('/sell');
                    closeAccountMenu();
                  }}
                >
                  <ListItemIcon>
                    <Add fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Add Product</ListItemText>
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate('/profile');
                    closeAccountMenu();
                  }}
                >
                  <ListItemIcon>
                    <Person2 fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>

                <MenuItem
                  onClick={async () => {
                    await logoutHandler();
                    closeAccountMenu();
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>
                    {loggingOut ? 'Logging out...' : 'Logout'}
                  </ListItemText>
                </MenuItem>
              </Menu>
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
