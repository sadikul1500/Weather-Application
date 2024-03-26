export interface WeatherData {
    temperature: number;
    main: string;
    humidity: number;
    wind_speed: number;
    pressure: number;
    feels_like: number;
    country: string;
    [key: string]: number | string | undefined;
}