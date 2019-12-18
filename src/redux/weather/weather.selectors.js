export const getWeatherList = ({ weather: { map } }) => Object.keys(map).map(key => map[key]);
export const getCurrentWeather = cityKey => ({ weather: { map } }) => map[cityKey];
export const gwtMyBookmarks = ({ weather: { map, bookmarks } }) => bookmarks.map(key => map[key]);
export const getIsOneOfMyBookmark = key => ({ weather: { map, bookmarks } }) => bookmarks.indexOf(key) !== -1;
