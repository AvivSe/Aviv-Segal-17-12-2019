export const getWeatherList = ({weather: { map }}) => Object.keys(map).map(key => map[key]);
export const getCurrentWeather = cityKey => ({weather: { map }}) => map[cityKey];
