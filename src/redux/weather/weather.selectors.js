export const getSelectedCityWeather = () => ({
  weather: {
    map,
    selectedCity: { key }
  }
}) => (!!key && map[key]) || null;
export const getSelectedCity = ({ weather: { selectedCity, map } }) => map[selectedCity];
export const getFavoriteCities = ({ weather: { ids, map, favorites } }) => ids.filter(cityKey=> favorites.indexOf(cityKey) !== -1).map(key => map[key]);
export const getIsOneOfMyFavorite = (city) => ({ weather: { favorites } }) => city && favorites.indexOf(city.key) !== -1;
export const getIsPending = key => ({ weather: { onPending } }) => onPending[key];
export const getIsFahrenheit = ({ weather: { isFahrenheit } }) => isFahrenheit;
export const getFiveDaysOfDailyForecasts = key => ({ fiveDaysOfDailyForecasts }) => fiveDaysOfDailyForecasts[key];
export const getCityMap = key => ({ weather: { map } }) => map;
