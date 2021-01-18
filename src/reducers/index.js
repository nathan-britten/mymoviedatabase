import { combineReducers } from 'redux';
import authReducer from './authReducer';
import movieReducer from './movieReducer';
import watchListReducer from './watchListReducer';

export default combineReducers({
  auth: authReducer,
  movies: movieReducer,
  watchlist: watchListReducer
})