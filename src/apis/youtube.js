import axios from 'axios';

export default axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  mode:"cors",
  headers:{
    //fix for cors
    "Content-Type":"application/x-www-form-urlencoded"
  }
})