export const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const toCelsius = fahrenheit => ((5 / 9) * (fahrenheit - 32)).toFixed(1);
export const accuWeatherCurrentWeatherResponseToMyWeather = ({
  WeatherIcon: iconId,
  WeatherText: text,
  LocalObservationDateTime: localObservationDateTime,
  Temperature: {
    Imperial: { Value: imperial },
    Metric: { Value: metric }
  }
}) => {
  return {
    iconId,
    text,
    localObservationDateTime,
    imperial,
    metric
  };
};

export const accWeatherCityToMyCity = ({
  LocalizedName: name,
  Key: key,
  Rank: rank,
  Country: { ID: countryId, LocalizedName: countryName }
}) => {
  return {
    name,
    key,
    countryName,
    countryId,
    rank
  };
};

export const accWeatherFiveDayOfDailyForecastsToMyForecast = ({
  Headline: { Category: category, Text: headlineText },
  DailyForecasts: acuuWeatherDailyForecasts
}) => ({
  headlineText,
  category,
  dailyForecasts: acuuWeatherDailyForecasts.map(
    ({
      Date: dateString,
      Temperature: {
        Minimum: { Value: minimumFahrenheit },
        Maximum: { Value: maximumFahrenheit }
      },
      Day: { Icon: dayTimeIcon, IconPhrase: dayTimeText },
      Night: { Icon: nightTimeIcon, IconPhrase: nightTimeText }
    }) => ({ dateString, minimumFahrenheit, maximumFahrenheit, dayTimeIcon, dayTimeText, nightTimeIcon, nightTimeText })
  )
});

export const getCityDisplayName = ({ name, countryName }) => `${name}, ${countryName}`;
