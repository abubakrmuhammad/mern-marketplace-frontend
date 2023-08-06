import { AppBar, Toolbar, Typography, Link, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
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
          <Link
            component={RouterLink}
            to='/dashboard'
            sx={{ color: 'white', ml: 2 }}
          >
            Dashboard
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
