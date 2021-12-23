import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute ({component: Component, loggedIn, setLoginStatus, isAuthSent, ...props }) {

  return (
      <Route>
        {isAuthSent && (loggedIn ? <Component {...props} /> : <Redirect to="./" />)
        }
      </Route>
  );
};

export default ProtectedRoute;
