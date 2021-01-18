import React from 'react';
import {Router, Route, Redirect } from 'react-router-dom';

import MovieSingle from './MovieSingle';
import MovieWatchList from './MovieWatchList';
import MoviesHolder from './MoviesHolder';

import Header from './Header';

import history from '../history';

const App = () => {

  return( 
    <div className="holder">
      <Router history={history}>
        <Header/>

          <Route exact path='/'>
            <Redirect to='/movies/popular' />
          </Route>
          <Route path='/movies/popular' exact component={MoviesHolder}/>
          <Route path='/movies/toprated' exact component={MoviesHolder}/>
          <Route path='/movies/single/:id' exact component={MovieSingle}/>
          <Route path='/mywatchlist' exact component={MovieWatchList}/>
      </Router>
    </div>
  )
}

export default App;