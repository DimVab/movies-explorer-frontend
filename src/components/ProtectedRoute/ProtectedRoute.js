import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute ({component: Component, loggedIn, isAuthSent, ...props }) {

  return (
      <Route>
        {isAuthSent && (loggedIn ? <Component {...props} /> : <Redirect to="./" />)
        }
      </Route>
  );
};

export default ProtectedRoute;
