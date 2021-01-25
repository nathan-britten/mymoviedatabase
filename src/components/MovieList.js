import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchMovies, addToWatchList, fetchWatchList } from '../actions';

import AddButton from './addButton';

class MovieList extends React.Component {

  renderExtraContent(movie) {
    if(!this.props.isSignedin) {
      return '';
    }

    return (
      <div className="extra content addbutton">
        <span className="right floated">
          <AddButton movieid={movie.id} movietitle={movie.original_title}  />
        </span>
      </div>
    )
  }

  renderItem = (movie) => {
    return( 
      <div className="card" >
      <Link to={{
        pathname:`/movies/single/${movie.id}`,
        state: {
          movietitle: movie.title 
        }
        }} 
        className="image">
        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt=""/>
      </Link>

      <div className="content">
          <div className="header">
            {movie.original_title}
          </div>
          <div className="description">
            {movie.overview.length > 140 ? movie.overview.substring(0, 130) + "..." : movie.overview }
          </div>
      </div>
      <div className="extra content">
        <span className="right floated">
          <i className="star icon"></i>
          {movie.vote_average}
        </span>
        <span>
          <i className="user icon"></i>
          {movie.vote_count}
        </span>
      </div>
      {this.renderExtraContent(movie)}
    </div>
    )

  } 

  renderList = () => {
    
    if(!this.props.movies || this.props.movies.length == 0) {
      return '' ;
    }
    return this.props.movies.map(movie => {
      if(!movie.overview) {
        return;
      }
      return (
        <React.Fragment key={movie.id}>

          {this.renderItem(movie)}

        </React.Fragment>
          
      )
    })
  }




  render() {
    return(
      <div className="ui link cards centered">{this.renderList()}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    movies: Object.values(state.movies),
    watchList: state.watchlist,
    isSignedin: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { fetchMovies, addToWatchList, fetchWatchList })(MovieList);