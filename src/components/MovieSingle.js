import React from 'react';
import { connect } from 'react-redux';
import { fetchMovie, deleteState } from '../actions';

class MovieSingle extends React.Component {

  componentDidMount() {
    this.props.fetchMovie(this.props.match.params.id)
  }

  renderMovie = () => {
    if(!this.props.movie) {
      return ''
    }
    const { movie } = this.props;
    const bgStyling = {
      backgroundImage: `linear-gradient(to right, rgba(3, 207, 252, 0.6), rgba(3, 69, 252, 0.6)), url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '500px'
    }

    const imgStyling = {
      backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.poster_path}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      minHeight: '450px'
    }

    return(
      <div className="ui grid" >
          <div className="sixteen wide column" style={bgStyling}>
                <div className="ui grid">
                  <div className="two wide column " style={imgStyling}>
                  </div>
                  <div className="six wide column">
                    
                  </div>
                </div>
          </div>
      </div>
    )
  }

  componentWillUnmount() {
 
    this.props.deleteState(this.props.movie)
  }

  render() {
    return(
      <div className="">
        {this.renderMovie()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    movie: state.movies.singlemoviedetails,
    cast: state.movies.singlemoviecast
  }
}
export default connect(mapStateToProps, { fetchMovie, deleteState })(MovieSingle);