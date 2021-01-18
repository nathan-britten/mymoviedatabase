import _ from 'lodash';
import { ADD_TO_WATCHLIST, DELETE_FROM_WATCHLIST, FETCH_WATCHLIST} from '../actions/types';




const INITIAL_STATE = {};

const movie = (state = INITIAL_STATE, action) => {


  switch(action.type) {
    case FETCH_WATCHLIST: 
      return {...state, ..._.mapKeys(action.payload, 'movieId')}
    case ADD_TO_WATCHLIST: 
      return {...state, [action.payload.movieId] : action.payload }
    case DELETE_FROM_WATCHLIST: 
      return _.omit(state, action.payload.movieId)
    default: 
    return state;
  }
}

export default movie;
