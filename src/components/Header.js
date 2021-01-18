import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

class Header extends React.Component {
  render() {
    return (
      <div className="ui pointer menu">
        <Link to="/" className="item">
          My Movie Database
        </Link>
        <div className="ui  search item">
          <div className="ui icon input">
            <input type="text" className="prompt" placeholder="Search for a movie."/>
            <i className="search icon"></i>
          </div>
          <div className="results"></div>
        </div>
        <div className="right menu">
          <Link to="/movies/mywatchlist" className="item">
            My Watch List
          </Link>
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

export default Header;