import _ from 'lodash';
import { FETCH_SEARCH_RESULTS, SET_SEARCH_TERM, SET_TO_SHOW } from '../actions/types';




const INITIAL_STATE = {
  results: {},
  show: ''
};

const search = (state = INITIAL_STATE, action) => {


  switch(action.type) {
    case FETCH_SEARCH_RESULTS: 
      state = INITIAL_STATE;
      return {...state, 'results' : action.payload }
    case SET_TO_SHOW:
      return {...state,  'show ' : action.payload}
    default: 
      return state;
  }
}

export default search;
