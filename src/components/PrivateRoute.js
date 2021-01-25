import { LocalPrintshopSharp } from '@material-ui/icons';
import React, {Component} from 'react';
import {Router, Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({component: Component, isAuthenticated, ...rest }) => { 
  return <Route {...rest} render={() => (
    
    isAuthenticated === true
        ? <Component/>
        : <Redirect to='/' />
    )} 
/>
}

export default PrivateRoute;