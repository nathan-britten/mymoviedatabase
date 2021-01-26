import React from 'react';
import { connect } from 'react-redux';
import { fetchMovies, fetchWatchList, deleteState, fetchWatchListMovies } from '../actions';

import MovieList from './MovieList';
import SearchBar from './SearchBar';

class MoviesHolder extends React.Component {

  componentDidMount() {
    if(this.props.match.path !== '/movies/mywatchlist') {
      this.props.fetchMovies(this.props.match.path)
    }

    if(this.props.match.path === '/movies/mywatchlist') {
      this.props.fetchWatchList(this.props.userid).then(() => {
        this.props.watchlist.forEach(el => {
          this.props.fetchWatchListMovies(el.movieId)
        })
      });
    }

  }


  render() {
    return(
      <React.Fragment>      
        <SearchBar />
        <div className="ui container">
          <MovieList currentUrl={this.props.match.path}/>
        </div>
      </React.Fragment>
    )
  }

  componentWillUnmount() {
 
    this.props.deleteState(this.props.movie)
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    watchlist: Object.values(state.watchlist),
    userid: state.auth.userId
  }
}

export default connect(mapStateToProps, { fetchMovies, fetchWatchList, deleteState, fetchWatchListMovies })(MoviesHolder);