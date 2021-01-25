import React from 'react';

class Button extends React.Component {
  render() {
    return(
      <div className="trailer-button ui button" onClick={this.props.onClick}>Watch Trailer</div>
      
    )
  }
}

export default Button;