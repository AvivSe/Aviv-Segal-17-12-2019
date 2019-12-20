export const getWeatherList = ({ weather: { map } }) => Object.keys(map).map(key => map[key]);
export const getOneWeather = cityKey => ({ weather: { map } }) => map[cityKey];
export const getSelectedCityWeather = () => ({ weather: { map, selectedCity: { key } } }) => map[key];
export const getSelectedCity = () => ({ weather: { selectedCity}}) => selectedCity;
export const gwtMyBookmarks = ({ weather: { map, bookmarks } }) => bookmarks.map(key => map[key]);
export const getIsOneOfMyBookmark = key => ({ weather: { map, bookmarks } }) => bookmarks.indexOf(key) !== -1;
