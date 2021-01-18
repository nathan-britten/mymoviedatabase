import movies from '../apis/moviedatabase';
import watchlist from '../apis/watchlist';

import { SIGN_IN, SIGN_OUT, FETCH_MOVIES, FETCH_MOVIE, FETCH_CREDITS, DELETE_STATE, ADD_TO_WATCHLIST, FETCH_WATCHLIST, DELETE_FROM_WATCHLIST } from './types';

export const signIn = (userId) => {
  return {
    type:  SIGN_IN,
    payload: userId
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const fetchMovies = (listType) => async (dispatch) => {
  const response = await movies.get(`${listType}`);
  dispatch({
    type: FETCH_MOVIES,
    payload: response.data
  })
}

export const fetchMovie = (id) => async (dispatch) => {
  const movieresponse = await movies.get(`${id}`);
  dispatch({
    type: FETCH_MOVIE,
    payload: movieresponse.data
  })

  const creditsresponse = await movies.get(`/${id}/credits`);
  dispatch({
    type: FETCH_CREDITS,
    payload: creditsresponse.data
  })
}

export const deleteState = (movie) => async (dispatch) => {
  console.log(movie)
  dispatch({
    type: DELETE_STATE,
    payload: movie
  })

}

export const addToWatchList = (movieId) => async (dispatch, getState) => {
  const { userId } = getState().auth;
 
  const response = await watchlist.post('/watchlist', {movieId, userId})
  dispatch({
    type: ADD_TO_WATCHLIST,
    payload: response.data
  })
}

export const fetchWatchList = () => async (dispatch) => {
  const response = await watchlist.get('/watchlist');
  dispatch({
    type: FETCH_WATCHLIST,
    payload: response.data
  })
  console.log('finished fetching')
}

export const deleteWatchListItem = (movie) => (dispatch) => {
  watchlist.delete(`/watchlist/${movie.id}`);
  dispatch({
    type: DELETE_FROM_WATCHLIST,
    payload: movie
  })
  console.log('finished deleting')

}