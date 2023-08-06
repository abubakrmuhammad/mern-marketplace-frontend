import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SIgnup';
import Admin from './views/admin/Admin';
import RequireAuth from './components/RequireAuth';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />

        <Route
          exact
          path='/admin'
          element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
