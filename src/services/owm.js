import { apiowm } from './api';

class OpenWeatherMap {
  constructor() {
    this.execut();
  }

  async execut(city) {
    const response = await apiowm.get('/', {
      params: {
        q: city,
        appid: process.env.KEYOWM,
        units: 'metric',
      },
    });
    return response.data;
  }
}

export default new OpenWeatherMap();
