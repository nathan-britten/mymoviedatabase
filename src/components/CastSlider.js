import React, { Component } from "react";
import Slider from "react-slick";

export default class Responsive extends Component {
  

  renderImage(castmember) {
    if(!castmember) {
      return;
    }
    if(!castmember.profile_path) {
      return <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Grey_background.jpg/1200px-Grey_background.jpg" alt=""/>
    } 

    return <img src={`https://image.tmdb.org/t/p/original${castmember.profile_path}`} className='centered' alt=""/>
  }
  renderList() {

    if(!this.props.cast) {
      return '' ;
    }
    return this.props.cast.map((castmember,index) => {
      if(index > 20) {
        return;
      }
      return (
        <div className="ui card">
          <div className="image">
            {this.renderImage(castmember)}
            
          </div>
          <div className="content">
            <a className="header">{castmember.name}</a>
            <div className="meta">
              <span className="">{castmember.character}</span>
            </div>
          </div>
        </div>
      )
    })
  }
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    };
    return (
      <div className='slider'>
        <h2> Cast Memebers </h2>
        <Slider {...settings}>
          {this.renderList()}
        </Slider>
      </div>
    );
  }
}