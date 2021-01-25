import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

  componentDidMount() {
    //load must have a callback but init does not. That is why we need the .then()
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '19603894718-01vlr3v3u373pv6l3ut2hdepqsptna2c.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange)
      })
    });
  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  signInOrOut = () => {
    if(!this.props.isSignedIn) {
      this.auth.signIn();
    } else {
      this.auth.signOut();

    }
  }

  renderAuthButton() {
    if(this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.signInOrOut}>
          <i className="google icon"/>
          Sign Out
        </button>
      )
    } else {
      return (
        <button className="ui green google button" onClick={this.signInOrOut}>
          <i className="google icon"/>
          Sign In
        </button>
      )
    }
  }

  render() {
    return(
      <div className="">
        {this.renderAuthButton()}
      </div>
        
      
    ) 
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);