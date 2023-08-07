import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import useAppStore from '../state/stores/appStore';
import Navbar from './Navbar';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const menuItems = [
  {
    text: 'Users',
    Icon: PersonIcon,
    path: '/admin/users',
  },
  {
    text: 'Products',
    Icon: InventoryIcon,
    path: '/admin/products',
  },
  {
    text: 'Categories',
    Icon: CategoryIcon,
    path: '/admin/categories',
  },
  {
    text: 'Checkouts',
    Icon: ShoppingBagIcon,
    path: '/admin/checkouts',
  },
];

function AdminLayout({ children }) {
  const drawerWidth = useAppStore(state => state.drawerWidth);

  const navigate = useNavigate();
  const location = useLocation();

  const activeItem = menuItems.findIndex(
    item => item.path === location.pathname,
  );

  return (
    <>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          backgroundColor: 'primary.main',
          color: 'white',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'primary.main',
            color: 'white',
          },
        }}
        variant='permanent'
        anchor='left'
        color='primary'
      >
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1, color: 'white' }}>
            Admin Panel
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                ...(index === activeItem && {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                }),
              }}
            >
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>
                  <item.Icon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width: `calc(100vw - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Navbar />
        <Container maxWidth='lg'>
          <Box my={4}>{children}</Box>
        </Container>
      </Box>
    </>
  );
}

export default AdminLayout;
