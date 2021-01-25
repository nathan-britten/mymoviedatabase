import _ from 'lodash';

import { FETCH_MOVIES, FETCH_MOVIE, FETCH_CREDITS, DELETE_SINGLE_MOVIE_STATE, FETCH_WATCHLIST_MOVIES, DELETE_WATCHLIST_ITEM_FROM_MOVIES, FETCH_TRAILER } from '../actions/types';


const INITIAL_STATE = {};

const movie = (state = INITIAL_STATE, action) => {


  switch(action.type) {
    case FETCH_MOVIES: 
      return {...state, ...action.payload }
    case FETCH_MOVIE: 
      return {...state, 'singlemovie': action.payload }
    case FETCH_CREDITS:
      return {...state, 'singlemoviecast':  action.payload.cast }
    case DELETE_SINGLE_MOVIE_STATE:
      state = INITIAL_STATE;
      return state
    case FETCH_WATCHLIST_MOVIES:
      return {...state, [action.payload.id] : action.payload }
    case DELETE_WATCHLIST_ITEM_FROM_MOVIES:
      return _.omit(state, action.payload.movieId)
    case FETCH_TRAILER:
      return {...state, 'trailerlink': action.payload }

    default: 
      return state;
  }
}

export default movie;