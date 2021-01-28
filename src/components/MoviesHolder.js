import React from 'react';
import { connect } from 'react-redux';
import { fetchMovies, fetchWatchList, deleteState, fetchWatchListMovies, fetchMoreMovies } from '../actions';

import MovieList from './MovieList';
import SearchBar from './SearchBar';

class MoviesHolder extends React.Component {

  state = {
    currentPage: 1
  }
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

  handleOnClickPrev = () => {
    let current = this.state.currentPage;
    this.props.fetchMoreMovies(this.props.match.path, current-1)
    this.setState({currentPage: current-1})

  }

  handleOnClickNext = () => {
    let current = this.state.currentPage;
    this.props.fetchMoreMovies(this.props.match.path, current+1)
    window.scrollTo(0, 0)
    this.setState({currentPage: current+1})
  }
  renderPreviousPageButton = () => {
    if(this.props.match.path == '/movies/mywatchlist') {
      return '';
    }
    if(this.state.currentPage === 1) {
      return '';
    }
    return (
      
      <button className="morebutton ui button" onClick={this.handleOnClickPrev}><i className="icon chevron left" />Page {this.state.currentPage-1}</button>

    )
  }
  renderNextPageButton = () => {
    if(this.props.match.path == '/movies/mywatchlist') {
      return '';
    }
      return (

        <button className="morebutton ui button" onClick={this.handleOnClickNext}>Page {this.state.currentPage+1}<i className="icon chevron right" /></button>

      )
  }

  render() {
    if(this.props.userid) {
    }
    
    return(
      <React.Fragment>      
        <SearchBar />
        <div className="ui container">
          <MovieList currentUrl={this.props.match.path}/>
          <div className="more-holder centered">
          {this.renderPreviousPageButton()}
          {this.renderNextPageButton()}
          </div>

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

export default connect(mapStateToProps, { fetchMovies, fetchWatchList, deleteState, fetchWatchListMovies, fetchMoreMovies })(MoviesHolder);