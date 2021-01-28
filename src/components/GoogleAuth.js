import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut, clearWatchListState, fetchWatchList } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '19603894718-01vlr3v3u373pv6l3ut2hdepqsptna2c.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        }).then(() => {
          this.props.fetchWatchList((this.props.userId))
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId())
        this.props.fetchWatchList((this.props.userId))

    } else {
      this.props.signOut();
      this.props.clearWatchListState();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui green google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { 
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId
   };
};

export default connect(
  mapStateToProps,
  { signIn, signOut, clearWatchListState, fetchWatchList }
)(GoogleAuth);
