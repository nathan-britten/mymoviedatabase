import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({component: Component, isAuthenticated, ...rest }) => { 
  return <Route {...rest} render={() => (
    
    isAuthenticated === true
        ? <Component/>
        : <Redirect to='/' />
    )} 
/>
}

export default PrivateRoute;