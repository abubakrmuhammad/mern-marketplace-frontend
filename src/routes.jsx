import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeView from './views/Home';
import LoginView from './views/Login';
import SignUpView from './views/Signup';
import Admin from './views/admin/Admin';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import AddProductView from './views/AddProduct';
import ProfileView from './views/Profile';

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path='/' element={<HomeView />} />
          <Route exact path='/login' element={<LoginView />} />
          <Route exact path='/signup' element={<SignUpView />} />
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
                <Admin />
              </RequireAuth>
            }
          />

          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
