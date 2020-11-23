export interface Places {
    features: Place[];
}

export interface Place {
    place_name: string;
    place_type: string[];
    center: [number, number];
}

export type Gps = {
    longitude: number;
    latitude: number;
}

export interface WeatherResponse {
    id: number;
    name: string;
    weather: SingleWeather[];
    main: MainWeatherParameters;
}

export type MainWeatherParameters = {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

export type SingleWeather = {
    description: string;
    icon: string;
    id: number;
    main: string;
}