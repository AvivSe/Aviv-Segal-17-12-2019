const fallbackWeather = {
  "name": "placeholder City Name",
  "key": "placeholder 215854",
  "LocalObservationDateTime": "2019-12-18T02:30:00+08:00",
  "EpochTime": 1576607400,
  "WeatherText": "placeholder Some clouds",
  "WeatherIcon": 36,
  "HasPrecipitation": false,
  "PrecipitationType": null,
  "IsDayTime": false,
  "Temperature": {
    "Metric": {
      "Value": 31.1,
      "Unit": "C",
      "UnitType": 17
    },
    "Imperial": {
      "Value": 88,
      "Unit": "F",
      "UnitType": 18
    }
  },
  "MobileLink": "http://m.accuweather.com/en/au/king-leopold-ranges/3494517/current-weather/3494517?lang=en-us",
  "Link": "http://www.accuweather.com/en/au/king-leopold-ranges/3494517/current-weather/3494517?lang=en-us",
  "Headline": { "Text": "placeholder text", "Category": "placeholder category"},
};
export const getWeatherList = ({ weather: { map } }) => Object.keys(map).map(key => map[key]);
export const getOneWeather = cityKey => ({ weather: { map } }) => map[cityKey];
export const getSelectedCityWeather = () => ({ weather: { map, selectedCity: { key } } }) => (!!key && map[key]) || null;
export const getSelectedCity = () => ({ weather: { selectedCity }}) => selectedCity;
export const gwtMyBookmarks = ({ weather: { map, bookmarks } }) => bookmarks.map(key => map[key]);
export const getIsOneOfMyBookmark = key => ({ weather: { map, bookmarks } }) => bookmarks.indexOf(key) !== -1;
export const getIsPending = ({ weather: { pending }}) => pending;
