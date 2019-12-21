export const getSelectedCityWeather = () => ({ weather: { map, selectedCity: { key } } }) => (!!key && map[key]) || null;
export const getSelectedCity = ({ weather: { selectedCity }}) => selectedCity;
export const getMyBookmarks = ({ weather: { map, bookmarks } }) => bookmarks.map(key => map[key]);
export const getBookmarkCities = ({ weather: { map, bookmarks } }) => bookmarks.map(key => ({key, name: map[key].name}));
export const getIsOneOfMyBookmark = key => ({ weather: { map, bookmarks } }) => bookmarks.indexOf(key) !== -1;
export const getIsPending = ({ weather: { pending }}) => pending;
export const getIsFahrenheit  = ({ weather: { isFahrenheit } }) => isFahrenheit;
