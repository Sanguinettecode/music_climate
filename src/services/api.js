import axios from 'axios';

export const apiowm = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});

export const apispotifycategories = axios.create({
  baseURL: 'https://api.spotify.com/v1/browse/categories',
});

export const apispotifytracks = axios.create({
  baseURL: 'https://api.spotify.com/v1/playlists',
});

export const autorization = axios.create({
  baseURL: 'https://accounts.spotify.com/api/token',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
