import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WeatherData } from 'src/app/shared/model/weather';
import { LocationData } from 'src/app/shared/model/location';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey: string = "effa722ea7473a3914f8d2820af97b8f";
  private baseUrl: string ="https://api.openweathermap.org/data/2.5/weather";
  private infoUnit: Record<string, string> = {"Farenheit": "imperial", "Celsius": "metric", "Kelvin": "standard"};  
  
  constructor(private http: HttpClient) {}

  fetchWeatherData(unit: string, location: LocationData): Observable<WeatherData>{
    const finalUrl = `${this.baseUrl}?lat=${location.latitude}&lon=${location.longitude}&exclude=hourly,daily&appid=${this.apiKey}&units=${this.infoUnit[unit || 'Kelvin']}`;
    return this.http.get<any>(finalUrl).pipe(
      map(this.mapResponseToWeatherData)
    );
  }

  private mapResponseToWeatherData(response: any): WeatherData {
    return {
      temperature: response.main.temp,
      feels_like: response.main.feels_like,
      main: response.weather[0].main,
      humidity: response.main.humidity,
      wind_speed: response.wind.speed,
      pressure: response.main.pressure,
      country: response.sys.country
    };
  }
}
