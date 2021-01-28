import movies from '../apis/moviedatabase';
import watchlist from '../apis/watchlist';
import youtube from '../apis/youtube';

import { SIGN_IN, SIGN_OUT, FETCH_MOVIES, FETCH_MOVIE, FETCH_CREDITS, DELETE_SINGLE_MOVIE_STATE, ADD_TO_WATCHLIST, FETCH_WATCHLIST, DELETE_FROM_WATCHLIST, FETCH_WATCHLIST_MOVIES, DELETE_WATCHLIST_ITEM_FROM_MOVIES, FETCH_SEARCH_RESULTS, SET_TO_SHOW, DELTE_WATCHLIST, FETCH_TRAILER } from './types';

export const signIn = userId => {
  
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const fetchMovies = (pageToFetch) => async (dispatch) => {
  let listType = '';
  let response;
  if(pageToFetch === '/movies/popular') {
    listType = 'discover/movie';
    response = await movies.get(`/${listType}`,{params: {
      'video': 'false',
      include_adult: 'false',
      sort_by: 'popularity.desc',
      with_original_language: 'en'
    }});
  }
  if(pageToFetch === '/movies/toprated') {
    listType = 'discover/movie';
    response = await movies.get(`/${listType}`,{params: {
      'video': 'false',
      include_adult: 'false',
      sort_by: 'vote_average.desc',
      with_original_language: 'en',
      'vote_count.gte': '2000',
      'vote_average.gte': '8'
    }});
  }
  dispatch({
    type: FETCH_MOVIES,
    payload: response.data.results
  })
}


export const fetchMoreMovies = (pageToFetch, page) => async (dispatch) => {
  console.log(page)
  console.log(pageToFetch)
  let listType = '';
  let response;
  console.log('here')
  if(pageToFetch === '/movies/popular') {
    listType = 'discover/movie';
    response = await movies.get(`/${listType}`,{params: {
      'video': 'false',
      include_adult: 'false',
      sort_by: 'popularity.desc',
      certification_country: 'en',
      with_original_language: 'en',
      page: page,
    }});

    dispatch({
      type: FETCH_MOVIES,
      payload: response.data.results
    })
  }
  
  if(pageToFetch === '/movies/toprated') {
    listType = 'discover/movie';
    response = await movies.get(`/${listType}`,{params: {
      'video': 'false',
      include_adult: 'false',
      sort_by: 'vote_average.desc',
      with_original_language: 'en',
      'vote_count.gte': '2000',
      'vote_average.gte': '8',
      page: page,
    }});
    dispatch({
      type: FETCH_MOVIES,
      payload: response.data.results
    })
}
}

export const fetchMovie = (id, title) => async (dispatch) => {
  const movieresponse = await movies.get(`/movie/${id}`);
  dispatch({
    type: FETCH_MOVIE,
    payload: movieresponse.data
  })

  const creditsresponse = await movies.get(`/movie/${id}/credits`);
  dispatch({
    type: FETCH_CREDITS,
    payload: creditsresponse.data
  })

  const key = 'AIzaSyBeVwb3Jq1xhzs3geY5-yNHMtupcleyP2Q';
  const searchterm = title + ' trailer';
  const trailerresponse = await youtube.get(`search?q=${searchterm}&key=${key}`)
  dispatch({
    type: FETCH_TRAILER,
    payload: trailerresponse.data.items[0].id.videoId
  })
}


export const deleteState = (movie) => async (dispatch) => {
  dispatch({
    type: DELETE_SINGLE_MOVIE_STATE,
    payload: movie
  })
}

export const addToWatchList = (movieId, movieTitle) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await watchlist.post('/watchlist', {movieId, userId, movieTitle})
  dispatch({
    type: ADD_TO_WATCHLIST,
    payload: response.data
  })
}

export const fetchWatchList = (userid) => async (dispatch) => {
  const response = await watchlist.get('/watchlist');

  let results = response.data
  let filtereddata = results.filter(result => result.userId === userid)

  dispatch({
    type: FETCH_WATCHLIST,
    payload: filtereddata
  })
}

export const clearWatchListState = () => async (dispatch) => {
  dispatch({
    type: DELTE_WATCHLIST
    })
}

export const deleteWatchListItem = (movie) => (dispatch) => {
  watchlist.delete(`/watchlist/${movie.id}`);
  dispatch({
    type: DELETE_FROM_WATCHLIST,
    payload: movie
  })
}

export const fetchWatchListMovies = (id) => async (dispatch) => {

  const response = await movies.get(`/movie/${id}`);

  dispatch({
    type: FETCH_WATCHLIST_MOVIES,
    payload: response.data
  })
}

export const deleteWatchListItemFromMovies = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_WATCHLIST_ITEM_FROM_MOVIES,
    payload: id
  })
}

export const fetchSearchResults = (query) => async (dispatch) => {
  const response = await movies.get('/search/movie', {params: {'query': query, 'video': 'false', include_adult: 'false' }});
  dispatch({
    type: FETCH_SEARCH_RESULTS,
    payload: response.data.results
  })

}

export const setToShow = (currentstate) => async (dispatch) => {
  dispatch({
    type: SET_TO_SHOW,
    payload: currentstate
  })

}