export const getSelectedCity = ({ weather: { selectedCity, map } }) => map[selectedCity];
export const getFavoriteCities = ({ weather: { ids, map, favorites } }) => ids.filter(cityKey=> favorites.indexOf(cityKey) !== -1).map(key => map[key]);
export const getIsOneOfMyFavorite = (city) => ({ weather: { favorites } }) => city && favorites.indexOf(city.key) !== -1;
export const getIsFahrenheit = ({ weather: { isFahrenheit } }) => isFahrenheit;
