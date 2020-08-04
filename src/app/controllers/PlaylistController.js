import User from '../models/User';
import OpenWeatherMap from '../../services/owm';
import Spotify from '../../services/spotify';

class PlaylistController {
  async index(req, res) {
    const user = await User.findByPk(req.userId);
    let category = '';
    const result = await OpenWeatherMap.execut(user.hometown);
    const { temp } = result.main;
    if (temp > 30) {
      category = 'party';
    } else if (temp >= 15 || temp <= 30) {
      category = 'pop';
    } else if (temp >= 10 || temp <= 14) {
      category = 'rock';
    } else {
      category = 'classical';
    }
    const responseSpotify = await Spotify.playlists(category);

    return res.json(responseSpotify);
  }
}

export default new PlaylistController();
