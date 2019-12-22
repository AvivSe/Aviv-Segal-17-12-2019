import axios from "axios";
import {
  accuWeatherCurrentWeatherResponseToMyWeather,
  accWeatherCityToMyCity,
  accWeatherFiveDayOfDailyForecastsToMyForecast
} from "./utils/tiny";
const apikey = "HyA6A3Q5IRGMw6uMxao1GEyB5KLpMRV3";
const ACCU_WEATHER_API_ROOT = "https://dataservice.accuweather.com";
const LOCATIONS_API = `${ACCU_WEATHER_API_ROOT}/locations/v1/cities`;
const CURRENT_WEATHER_API = `${ACCU_WEATHER_API_ROOT}/currentconditions/v1`;
const FIVE_DAYS_OF_DAILY_FORECASTS_API = `${ACCU_WEATHER_API_ROOT}/forecasts/v1/daily/5day`;

class AccuWeatherService {
  async autocompleteSearchCities(q) {
    return axios.get(`${LOCATIONS_API}/autocomplete`, { params: { q, apikey } }).then(response => {
      return response.data && Array.isArray(response.data) ? response.data.map(accWeatherCityToMyCity) : [];
    });
  }

  async fetchCurrentWeather(city) {
    return axios.get(`${CURRENT_WEATHER_API}/${city.key}`, { params: { apikey } }).then(async res => {
      return { ...accuWeatherCurrentWeatherResponseToMyWeather(res.data[0]) };
    });
  }

  async fetchFiveDaysOfDailyForecasts(city) {
    return axios
      .get(`${FIVE_DAYS_OF_DAILY_FORECASTS_API}/${city.key}`, { params: { apikey } })
      .then(res => accWeatherFiveDayOfDailyForecastsToMyForecast(res.data));
  }
}
const instance = new AccuWeatherService();
export default Object.freeze(instance);
