import axios from "axios";
import mockData from './mockData'
const apikey = "HyA6A3Q5IRGMw6uMxao1GEyB5KLpMRV3";
const ACCU_WEATHER_API_ROOT = "https://dataservice.accuweather.com";
const LOCATIONS_API = `${ACCU_WEATHER_API_ROOT}/locations/v1/cities`;
const CURRENT_WEATHER_API = `${ACCU_WEATHER_API_ROOT}/currentconditions/v1`;
const FIVE_DAYS_OF_DAILY_FORECASTS_API = `${ACCU_WEATHER_API_ROOT}/forecasts/v1/daily/5day`;
function takeTime(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms || 50);
  })
}

const useMocks = true;

class AccuWeatherService {
  async autocompleteSearchCities(q) {
    if(useMocks) {
      await takeTime();
      return {data: mockData.result_for_autocomplete_q_is_tel};
    }
    return axios.get(`${LOCATIONS_API}/autocomplete`, { params: { q, apikey }})
  }

  async fetchCurrentWeather(cityKey) {
    if(useMocks) {
      await takeTime();
      return mockData.result_for_tlv[0];
    }
    return axios.get(`${CURRENT_WEATHER_API}/${cityKey}`, { params: { apikey }}).then(res => res.data[0]);
  }

  async fetchFiveDaysOfDailyForecasts(cityKey) {
    if(useMocks) {
      await takeTime();
      return mockData.fiv_days_tlv;
    }
    return axios.get(`${FIVE_DAYS_OF_DAILY_FORECASTS_API}/${cityKey}`, { params: { apikey }}).then(res => res.data);
  }
}
const instance = new AccuWeatherService();
export default Object.freeze(instance);
