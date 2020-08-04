import Spotify from '../../services/spotify';

class TracksController {
  async index(req, res) {
    const { playlistId } = req.params;
    const responseTracks = await Spotify.tracks(playlistId);

    return res.json(responseTracks);
  }
}

export default new TracksController();
