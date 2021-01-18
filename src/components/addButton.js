import React from 'react';
import { connect } from 'react-redux';
import { fetchWatchList, addToWatchList, deleteWatchListItem } from '../actions';

class addButton extends React.Component {
  
  submitToWatchlist = (movieid) => {
    this.props.addToWatchList(movieid)
  }

  removeFromWatchList = (movieid) => {
    this.props.deleteWatchListItem(movieid)
  
  }

  createButton = () => {

    let inWatchList = false;
    
    if(!this.props.watchList) {
      return ''
    }

    if(this.props.watchList[this.props.movieid]) {
      return(
        <div className="ui button red" onClick={() => this.removeFromWatchList(this.props.watchList[this.props.movieid])}>Remove From Watchlist</div>
      )
    }

      return(
        <div className="ui button green" onClick={() => this.submitToWatchlist(this.props.movieid)}>Add to Watchlist</div>
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
  // console.log(state.watchlist)
  return {
    movies: state.movies.movies,
    watchList: state.watchlist
  }
}

export default connect(mapStateToProps, { fetchWatchList, addToWatchList, deleteWatchListItem })(addButton);