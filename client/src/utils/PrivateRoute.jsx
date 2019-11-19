import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAdmin, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const user = localStorage.getItem('user');
      if (isAdmin) {
        if (user && JSON.parse(user).isAdmin) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }
      if (user) {
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      );
    }}
  />
);

export default PrivateRoute;
