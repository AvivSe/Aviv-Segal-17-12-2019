export const getSelectedCityWeather = () => ({
  weather: {
    map,
    selectedCity: { key }
  }
}) => (!!key && map[key]) || null;
export const getSelectedCity = ({ weather: { selectedCity, map } }) => map[selectedCity];
export const getFavoriteCities = ({ weather: { ids, map, favorites } }) => ids.filter(cityKey=> favorites.indexOf(cityKey) !== -1).map(cityKey => map[cityKey]);
export const getIsOneOfMyFavorite = ({key}) => ({ weather: { favorites } }) => favorites.indexOf(key) !== -1;
export const getIsPending = key => ({ weather: { onPending } }) => onPending[key];
export const getIsFahrenheit = ({ weather: { isFahrenheit } }) => isFahrenheit;
export const getFiveDaysOfDailyForecasts = key => ({ fiveDaysOfDailyForecasts }) => fiveDaysOfDailyForecasts[key];
export const getCityMap = key => ({ weather: { map } }) => map;
