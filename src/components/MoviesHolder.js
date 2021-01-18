import React from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../actions';

import MovieList from './MovieList';

class MoviesHolder extends React.Component {

  componentDidMount() {
    let listType = 'popular';
    if(this.props.match.path === '/movies/popular') {
      listType = 'popular';
    }
    if(this.props.match.path === '/movies/toprated') {
      listType = 'top_rated';
    }
    this.props.fetchMovies(listType)
    console.log("MOVIE HOLDER FIRST RENDER")
  }


  render() {
    return(
      <div className="ui container">
        <MovieList/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    movies: state.movies.movies,
  }
}

export default connect(mapStateToProps, { fetchMovies })(MoviesHolder);