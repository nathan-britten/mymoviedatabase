import axios from 'axios';

export default axios.create({
  baseURL: 'https://json-server-nb.herokuapp.com'
})