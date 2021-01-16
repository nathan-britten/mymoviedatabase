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
        <div className="right menu">
          <Link to="/movie/mywatchlist" className="item">
            My Watch List
          </Link>
          <Link to="/movie/popular" className="item">
            Most Popular
          </Link>
          <Link to="/movie/toprated" className="item">
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