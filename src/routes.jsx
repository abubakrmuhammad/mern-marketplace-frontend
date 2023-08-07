import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeView from './views/Home';
import LoginView from './views/Login';
import SignUpView from './views/Signup';
import RequireAuth from './components/RequireAuth';
import AddProductView from './views/AddProduct';
import ProfileView from './views/Profile';
import AdminProducts from './views/admin/AdminProducts';
import AdminUsers from './views/admin/AdminUsers';
import AdminOrders from './views/admin/AdminOrders';
import AdminCategories from './views/admin/AdminCategories';
import ForgotPasswordView from './views/ForgotPassword';
import ProductDetailView from './views/ProductDetail';
import CartView from './views/Cart';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomeView />} />
        <Route exact path='/login' element={<LoginView />} />
        <Route exact path='/signup' element={<SignUpView />} />
        <Route exact path='/forgot-password' element={<ForgotPasswordView />} />
        <Route exact path='/p/:slug' element={<ProductDetailView />} />
        <Route exact path='/cart' element={<CartView />} />
        <Route
          exact
          path='/sell'
          element={
            <RequireAuth>
              <AddProductView />
            </RequireAuth>
          }
        />
        <Route
          exact
          path='/profile'
          element={
            <RequireAuth>
              <ProfileView />
            </RequireAuth>
          }
        />

        <Route
          exact
          path='/admin'
          element={
            <RequireAuth admin>
              <Navigate to='/admin/users' replace />
            </RequireAuth>
          }
        />
        <Route
          exact
          path='/admin/users'
          element={
            <RequireAuth admin>
              <AdminUsers />
            </RequireAuth>
          }
        />
        <Route
          exact
          path='/admin/products'
          element={
            <RequireAuth admin>
              <AdminProducts />
            </RequireAuth>
          }
        />
        <Route
          exact
          path='/admin/categories'
          element={
            <RequireAuth admin>
              <AdminCategories />
            </RequireAuth>
          }
        />

        <Route
          exact
          path='/admin/orders'
          element={
            <RequireAuth admin>
              <AdminOrders />
            </RequireAuth>
          }
        />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
