import _ from 'lodash';

import { FETCH_MOVIES, FETCH_MOVIE, FETCH_CREDITS, DELETE_STATE } from '../actions/types';


const INITIAL_STATE = {};

const movie = (state = INITIAL_STATE, action) => {


  switch(action.type) {
    case FETCH_MOVIES: 
      return {...state, movies: action.payload}
    case FETCH_MOVIE: 
      return {...state, 'singlemovie': {'singlemoviedetails' : action.payload } }
    case FETCH_CREDITS:
      return {...state.singlemovie, 'singlemoviecast':  action.payload.cast }
    case DELETE_STATE:
      return _.omit(state, 'singlemoviedetails')
    default: 
      return state;
  }
}

export default movie;