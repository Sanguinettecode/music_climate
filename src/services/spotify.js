import axios from 'axios';
import { apispotifycategories, apispotifytracks } from './api';

class Spotify {
  constructor() {
    this.playlists();
    this.tracks();
  }

  async playlists(category_id) {
    const auth = await getToken();

    apispotifycategories.defaults.headers.Authorization = `Bearer ${
      // eslint-disable-next-line no-use-before-define
      auth.data.access_token
    }`;
    const response1 = await apispotifycategories.get(
      `${category_id}/playlists`
    );

    return response1.data;
  }

  async tracks(trackId) {
    const auth = await getToken();
    apispotifytracks.defaults.headers.Authorization = `Bearer ${
      // eslint-disable-next-line no-use-before-define
      auth.data.access_token
    }`;
    const response = await apispotifytracks.get(`${trackId}/tracks`);

    return response.data;
  }
}

const getToken = async () => {
  const resultAuth = await axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'client_credentials',
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: process.env.USER_ID,
      password: process.env.USER_SECRET,
    },
  });
  return resultAuth;
};

export default new Spotify();
