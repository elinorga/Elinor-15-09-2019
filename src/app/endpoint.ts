const apiKey: string = `m80B8Z4rQzE2w30WtuOFJj6QvZuCvO9d`;

export const autocompleteUrl: string = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&language=en-us`;

export const rootCurrentWeather: string = `https://dataservice.accuweather.com/currentconditions/v1/`;
export const currentWeatherParams: string = `?apikey=${apiKey}&language=en-us&details=false`;

export const rootForecast5Days: string = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/`;
export const forecast5DaysParams: string = `?apikey=${apiKey}&details=false&metric=true`;