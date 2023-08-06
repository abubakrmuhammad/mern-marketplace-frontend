import { Container, CssBaseline, Box } from '@mui/material';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />

      <Navbar />
      <Container maxWidth='lg'>
        <Box my={4}>{children}</Box>
      </Container>
    </>
  );
};

export default Layout;
