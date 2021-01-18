import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchMovies, addToWatchList, fetchWatchList } from '../actions';

import AddButton from './addButton';

class MovieList extends React.Component {

  componentDidMount() {
    this.props.fetchWatchList()
  }
  renderList = () => {
    
    if(!this.props.movies) {
      return '';
    }
  
    return this.props.movies.results.map(movie => {
      return (
        <React.Fragment key={movie.id}>

          <div className="card" >
            <Link to={`/movies/single/${movie.id}`}  className="image">
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
            <div className="extra content">
              <span className="right floated">

                <AddButton movieid={movie.id}  />

              </span>
            </div>
          </div>

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
    movies: state.movies.movies,
    watchList: state.watchlist
  }
}

export default connect(mapStateToProps, { fetchMovies, addToWatchList, fetchWatchList })(MovieList);