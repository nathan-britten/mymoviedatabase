import React from 'react';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import SimpleSlider from './CastSlider';

import { fetchMovie, deleteState, setToShow} from '../actions';
import AddButton from './addButton';

class MovieSingle extends React.Component {

  componentDidMount() {
    console.log(this.props)
    let phrase = ''
    if(this.props.location.state) {
     phrase = this.props.location.state.movietitle;
    }
    this.props.fetchMovie(this.props.match.params.id, phrase)
  }

  
  renderNoImage(movie) {
    if(!movie.poster_path) {
      return(
      <div className="ui placeholder">
        <div className="square image" ></div>
      </div>
      )
    }
  }

  createGenres(movie) {
    return (
      movie.genres.map(genre => {
        return (
          <div className="item" key={genre.id}>{genre.name}</div>
        )
      })
    )
  }

  getRuntime(movie) {
    var num = movie.runtime;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return (
      <div className="item">{rhours + "h " + rminutes + "m"}</div>
    )
  }

  RenderYoutube() {
    return (
      <iframe id="player" title='Trailer Container' type="text/html" width="640" height="390"
      src={`https://www.youtube.com/embed/${this.props.trailer}`}
      frameBorder="0" allowFullScreen="allowfullscreen"></iframe>
    )
 
  }
  ModalExampleShorthand() {

      return (
        <Modal
          trigger={<Button>Watch Trailer</Button>}
          header={this.props.movie.title + ' Trailer'}
          content={this.RenderYoutube()}
          actions={[{ key: 'done', content: 'Done', positive: false }]}
        />
      )
  }

  renderMovie = () => {
    if(!this.props.movie) {
      return ''
    }
    const { movie } = this.props;
    const bgStyling = {
      backgroundImage: `linear-gradient(to right, rgba(3, 207, 252, 0.6), rgba(3, 69, 252, 0.9)), url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      padding: '40px 0px'
    }

    return(
      <React.Fragment>
        <div className="" style={bgStyling}>
                <div className="ui stackable two column grid centered">
                  <div className="poster three wide column">
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className='centered' alt=""/>
                    {!movie.poster_path ? this.renderNoImage(movie) : ''}
                  </div>
                  <div className="film-information six wide column">
                    <div className="title-holder ui two column grid">
                    <h2>{movie.original_title + " (" + movie.release_date.substring(0,4) + ")"}</h2>
                    <CircularProgressbar
                      value={movie.vote_average} 
                      maxValue={10} 
                      text={`${movie.vote_average}`} 
                      counterClockwise
                      styles={buildStyles({

                     
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',
                     
                        // Text size
                        textSize: '20px',
                     
                        // How long animation takes to go from one percentage to another, in seconds
                        pathTransitionDuration: 0.5,
                     
                        // Can specify path transition in more detail, or remove it entirely
                        // pathTransition: 'none',
                     
                        // Colors
                        pathColor: `rgba(33,186,69, ${movie.vote_average * 10})`,
                        textColor: '#fff',
                        trailColor: '#d6d6d6',
                      })} 
                    />
                    </div>

                    <h4>{movie.tagline}</h4>
                    <div className="film-meta ui horizontal bulleted link list">
                      {this.createGenres(movie)}
                      {this.getRuntime(movie)}
                    </div>
                    <p className='movie-overview'>{movie.overview}</p>
                    <div className="ui two column grid">
                      <AddButton movieid={movie.id} movietitle={movie.original_title} />
                      {this.ModalExampleShorthand()}
                    </div>
                  </div>
                </div>
          </div>

        <div className="slider-container ui container">
        <SimpleSlider cast={this.props.cast}/>
        </div>
          

        
      </React.Fragment>
    )
  }

  componentWillUnmount() {
 
    this.props.deleteState(this.props.movie)
  }

  render() {
    return(
      <div className="singlemovie-holder">
        {this.renderMovie()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    movie: state.movies.singlemovie,
    cast: state.movies.singlemoviecast,
    trailer: state.movies.trailerlink
  }
}
export default connect(mapStateToProps, { fetchMovie, deleteState, setToShow})(MovieSingle);