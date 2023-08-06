import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children, loginRoute = '/login' }) {
  const isAuthenticated = true;
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={loginRoute} replace state={{ path: location.pathname }} />
  );
}

export default RequireAuth;
