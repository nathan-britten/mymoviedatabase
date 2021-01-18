import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'c73b4ae4dd67958b1bf1d647407ac71c',
    language: 'en-US',
    page: '1'
  }
})

