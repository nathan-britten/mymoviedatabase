import React from 'react';
import MoviesHolder from './MoviesHolder';

class MovieWatchList extends React.Component {
  render() {
    let myObj = {
      'path': '/movies/mywatchlist'
    }
    return(
      <div className="">
        <MoviesHolder match={myObj}/>
      </div>
    )
  }
}

export default MovieWatchList;