import Spotify from '../../services/spotify';

class TracksController {
  async index(req, res) {
    const { trackId } = req.body;
    const responseTracks = await Spotify.tracks(trackId);

    return res.json(responseTracks);
  }
}

export default new TracksController();
