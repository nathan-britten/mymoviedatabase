import { combineReducers } from 'redux';
import authReducer from './authReducer';
import movieReducer from './movieReducer';
import watchListReducer from './watchListReducer';
import searchBarReducer from './searchBarReducer';

export default combineReducers({
  auth: authReducer,
  movies: movieReducer,
  watchlist: watchListReducer,
  search: searchBarReducer
})