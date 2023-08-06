import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../state/stores/authStore';

function RequireAuth({ children, admin = false, loginRoute = '/login' }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isAdmin = useAuthStore(state => state.isAdmin);
  const location = useLocation();

  if (admin && !isAdmin) {
    return <Navigate to='/' replace />;
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={loginRoute} replace state={{ path: location.pathname }} />
  );
}

export default RequireAuth;
