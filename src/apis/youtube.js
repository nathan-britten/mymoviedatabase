import axios from 'axios';

export default axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  // header: {
  //   Authorization: Bearer [YOUR_ACCESS_TOKEN]
  // }
})