import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loginSelector } from './features/user/userSlice';
import { RootState } from './store';

interface PrivateRouteProps {
  component: any;
  path: string;
  exact?: boolean;
}

function PrivateRoute({ component, path, exact = false }: PrivateRouteProps): JSX.Element {
  const { isLoggedIn } = useSelector((state: RootState) => loginSelector.getUserInfo(state));

  return isLoggedIn ? <Route path={path} exact={exact} component={component} /> : <Redirect to="/" />;
}
export default PrivateRoute;
