import axios from "axios";
import mockData from './mockData'
const apikey = "HyA6A3Q5IRGMw6uMxao1GEyB5KLpMRV3";
const ACCU_WEATHER_API_ROOT = "https://dataservice.accuweather.com";
const LOCATIONS_API = `${ACCU_WEATHER_API_ROOT}/locations/v1/cities`;
class AccuWeatherService {
  async autocompleteSearchCities(q) {
    console.log("Backend request");
    return { data: mockData.result_for_autocomplete_q_is_tel };
    // return new Promise(resolve => {
    //   setTimeout(function() {
    //     console.log("backend response");
    //     resolve(mockData.result_for_autocomplete_q_is_tel)
    //   },2000)
    // })
    //return axios.get(`${LOCATIONS_API}/autocomplete`, { params: { q, apikey }})
  }
}
const instance = new AccuWeatherService();
export default Object.freeze(instance);
