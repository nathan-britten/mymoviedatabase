import React from 'react';
import {Router, Route, Switch, Redirect } from 'react-router-dom';

import MovieList from './MovieList';
import MovieSingle from './MovieSingle';
import MovieWatchList from './MovieWatchList';
import Header from './Header';

import history from '../history';

const App = () => {

  return( 
    <div className="holder">
      <Router history={history}>
        <Header/>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/movie' />
          </Route>
          <Route path='/movie' exact component={MovieList}/>
          <Route path='/movie/popular' exact component={MovieList}/>
          <Route path='/movie/toprated' exact component={MovieList}/>
          <Route path='/movie/:id' exact component={MovieSingle}/>
          <Route path='/mywatchlist' exact component={MovieWatchList}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App;