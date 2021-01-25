import React from 'react';
import { connect } from 'react-redux';
import { fetchWatchList, addToWatchList, deleteWatchListItem, deleteWatchListItemFromMovies } from '../actions';

class addButton extends React.Component {
  
  submitToWatchlist = (movieid, movietitle) => {
    this.props.addToWatchList(movieid, movietitle)
  }

  removeFromWatchList = (movie) => {
    this.props.deleteWatchListItem(movie)
    this.props.deleteWatchListItemFromMovies(movie)
  }

  createButton = () => {
    
    if(!this.props.watchList) {
      return ''
    }

    if(this.props.watchList[this.props.movieid]) {
      return(
        <div className="ui button red" onClick={() => this.removeFromWatchList(this.props.watchList[this.props.movieid])}>Remove From Watchlist</div>
      )
    }

      return(
        <div className="ui button green" onClick={() => this.submitToWatchlist(this.props.movieid, this.props.movietitle)}>Add to Watchlist</div>
      )
  }

  render() {
    return (
      <div className="">
        {this.createButton()}
      </div>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.movies,
    watchList: state.watchlist,
 
  }
}

export default connect(mapStateToProps, { fetchWatchList, addToWatchList, deleteWatchListItem, deleteWatchListItemFromMovies })(addButton);