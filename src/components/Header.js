import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleAuth from './GoogleAuth';
import SearchBar from './SearchBar';
import { setToShow } from '../actions';

class Header extends React.Component {

  renderSearch() {
    if (this.props.urls.location.pathname.includes('/movies/single')) {
      return (
      <div className="ui search item searchbar">
         <SearchBar />
      </div>
      )
    }
    return ''
  }

  renderWatchListMenu() {
    if(this.props.issignedin) {
      return (
        <Link to="/movies/mywatchlist" className="item">
        My Watch List
        </Link>
      )
      return '';
    }
  }

  render() {
    if(window.innerWidth < 900) {
      return (
        <div className="ui vertical menu">
          <Link to="/" className="logo-holder">
            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" className="logo" alt=""/>
          </Link>
          <Link to="/movies/popular" className="item">
                Most Popular
          </Link>
          <Link to="/movies/toprated" className="item">
                Top Rated
          </Link>
          {this.renderWatchListMenu()}
          <div className="item">
                <GoogleAuth />
          </div>
              {this.renderSearch()}
              


 
        
          
        </div>
      )
    }
    return (
      <div className="ui pointer menu">
        <Link to="/" className="item">
          My Movie Database
        </Link>
        <div className="right menu">
          {this.renderSearch()}
          {this.renderWatchListMenu()}

          <Link to="/movies/popular" className="item">
            Most Popular
          </Link>
          <Link to="/movies/toprated" className="item">
            Top Rated
          </Link>
          <div className="item">
            <GoogleAuth />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchresults: Object.values(state.search),
    issignedin: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { setToShow })(Header);