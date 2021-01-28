import React from 'react';
import {Router, Route, Redirect } from 'react-router-dom';

import MovieSingle from './MovieSingle';
import MovieWatchList from './MovieWatchList';
import MoviesHolder from './MoviesHolder';
import PrivateRoute from './PrivateRoute';

import Header from './Header';
import history from '../history';
import {connect} from 'react-redux';

class App extends React.Component {

  render() {
    return( 
      <div className="holder">
        <Router history={history}>
          <Header urls={history}/>
          <Route exact path={'/'}>
            <Redirect to='/movies/popular' />
          </Route>
          <Route exact path={'/movies'}>
            <Redirect to='/movies/popular' />
          </Route>
          <Route path='/movies/popular' exact component={MoviesHolder}/>
          <Route path='/movies/toprated' exact component={MoviesHolder}/>
          <Route path='/movies/single/:id' exact component={MovieSingle}/>
          <PrivateRoute 
            path='/movies/mywatchlist'
            exact
            component={MovieWatchList}
            isAuthenticated={this.props.issignedin}
          />
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    issignedin: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps)(App);