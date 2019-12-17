export const getWeatherList = ({ weather: { map } }) => Object.keys(map).map(key => map[key]);
export const getCurrentWeather = cityKey => ({ weather: { map } }) => map[cityKey];
export const gwtMyFavorites = ({ weather: { map, favorites } }) => favorites.map(key => map[key]);
export const getIsOneOfMyFavorite = key => ({ weather: { map, favorites } }) => favorites.indexOf(key) !== -1;
