import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface CurrentWeatherResponse {
    current: {
        temperature_2m: number;
        apparent_temperature: number;
        relative_humidity_2m: number;
        wind_speed_10m: number;
        weather_code: number;
        is_day: number;
    };
    hourly: {
        time: string[];
        temperature_2m: number[];
        weather_code: number[];
    };
    
    daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    wind_direction_10m_dominant: number[];
    };
}

export interface GeocodingLocation {
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    admin1?: string;
}

interface GeocodingResponse {
    results?: GeocodingLocation[];
}

@Injectable(
    { providedIn: 'root' }
)
export class Weather {
    private readonly http = inject(HttpClient);

    URL_WEATHER = 'https://api.open-meteo.com/v1/forecast';

    getCurrentWeather(latitude: number, longitude: number) {
        return this.http.get<CurrentWeatherResponse>(`${this.URL_WEATHER}`, {
            params: {
                latitude: String(latitude),
                longitude: String(longitude),
                current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day',
                hourly: 'temperature_2m,weather_code',
                temperature_unit: 'celsius',
                wind_speed_unit: 'kmh',
                timezone: 'auto',
                daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant',
                forecast_days: '8',
            },
        });
    }

    searchLocations(name: string) {
        return this.http.get<GeocodingResponse>(`https://geocoding-api.open-meteo.com/v1/search`, {
            params: {
                name,
                count: '5',
                language: 'en',
                format: 'json',
            },
        });
    }
}
