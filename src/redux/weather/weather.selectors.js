export const getSelectedCityWeather = () => ({ weather: { map, selectedCity: { key } } }) => (!!key && map[key]) || null;
export const getSelectedCity = ({ weather: { selectedCity }}) => selectedCity;
export const getFavoritesAsWeather = ({ weather: { map, favorites } }) => favorites.map(key => map[key]);
export const getFavoriteedCities = ({ weather: { map, favorites } }) => favorites.map(key => ({key, name: map[key].name}));
export const getIsOneOfMyFavorite = key => ({ weather: { map, favorites } }) => favorites.indexOf(key) !== -1;
export const getIsPending = ({ weather: { pending }}) => pending;
export const getIsFahrenheit  = ({ weather: { isFahrenheit } }) => isFahrenheit;
