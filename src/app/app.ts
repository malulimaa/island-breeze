import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { type CurrentWeatherResponse, type GeocodingLocation, Weather } from './services/weather';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('island-breeze');

  constructor(public Weather: Weather, private crd: ChangeDetectorRef) { }

  searchTerm = '';
  suggestions: GeocodingLocation[] = [];
  unit = signal<'C' | 'F'>('C');

  currentWeather?: CurrentWeatherResponse['current'];
  locationName: string = 'São Paulo';

  isNight = signal(false);

  forecastCards: {
    period: string;
    label: string;
    time: string;
    temperature: number;
    description: string;
    icon: string;
  }[] = [];

  weeklyCards: {
    date: string;
    dateLabel: string;
    dateWeek: string;
    isTomorrow: boolean;
    temperatureMax: number;
    temperatureMin: number;
    description: string;
    icon: string;
    windSpeed: number;
    rainProbability: number | null;
    windDirection: string;
  }[] = [];

  ngOnInit(): void {
    setInterval(this.updateClock, 1000);
    this.updateClock();
    
    this.updateWeather({
      name: 'São Paulo, São Paulo, Brazil',
      latitude: -23.55,
      longitude: -46.63,
    });
  }

  updateClock(): void {
    const currentTime: Date = new Date();
    const currentDate: Date = new Date();

    const clockElement: HTMLElement | null = document.getElementById('clock');
    const dateElement: HTMLElement | null = document.getElementById('date');
    const dateWeekElement: HTMLElement | null = document.getElementById('date-week');
    const dateDayElement: HTMLElement | null = document.getElementById('date-day');

    if (clockElement) {
      clockElement.textContent = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    if (dateElement) {
      dateElement.textContent = currentDate.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
    }

    if (dateWeekElement) {
      dateWeekElement.textContent = currentDate.toLocaleDateString([], { weekday: 'long' });
    }

    if (dateDayElement) {
      dateDayElement.textContent = currentDate.toLocaleDateString([], { day: 'numeric', month: 'long' });
    }
  }

  searchLocation(): void {
    const query = this.searchTerm.trim();
    if (!query) return;

    this.Weather.searchLocations(query).subscribe({
      next: (response) => {
        const place = response.results?.[0];

        if (place) {
          this.updateWeather(place);
        }
      },
      error: (error) => {
        console.error('Error searching for location:', error);
      },
    });
  }

  get weatherCondition(): string {
    const code = this.currentWeather?.weather_code;

    if (code === undefined) return 'Loading weather...';

    if (code === 0) return 'Currently sunny';
    if (code === 1) return 'Mostly clear';
    if (code === 2) return 'Partly cloudy';
    if (code === 3) return 'Overcast';
    if (code === 45 || code === 48) return 'Foggy';
    if (code >= 51 && code <= 67) return 'Rainy';
    if (code >= 80 && code <= 82) return 'Rain showers';
    if (code >= 95) return 'Thunderstorms';

    return 'Changing weather';
  }

  get currentWeatherTitle(): string {
    const code = this.currentWeather?.weather_code;

    if (code === undefined) return 'The island is waking up';

    if (code === 0) return 'A beautiful day';
    if (code === 1 || code === 2) return 'A lovely day';
    if (code === 3) return 'A cloudy day';
    if (code === 45 || code === 48) return 'A misty day';
    if (code >= 51 && code <= 67) return 'A rainy day';
    if (code >= 80 && code <= 82) return 'Showers are passing';
    if (code >= 95) return 'A stormy day';

    return 'A changing day';
  }

  get weatherSummary(): string {
    const code = this.currentWeather?.weather_code;

    if (code === undefined) return 'Loading weather...';

    if (code === 0) {
      return 'Clear skies today. Perfect weather for a stroll along the shore.';
    }

    if (code === 1 || code === 2) {
      return 'Some clouds in the sky, with pleasant weather for a stroll.';
    }

    if (code === 3) {
      return 'Cloudy skies today. A walk along the shore could still be lovely.';
    }

    if (code === 45 || code === 48) {
      return 'Foggy conditions today. Take care if you head out.';
    }

    if (code >= 51 && code <= 67) {
      return 'Rain is expected. Consider bringing an umbrella.';
    }

    if (code >= 80 && code <= 82) {
      return 'Rain showers may pass through. Consider bringing an umbrella.';
    }

    if (code >= 95) {
      return 'Thunderstorms are possible. Stay somewhere safe.';

    }

    return 'The weather is changing. Check back soon for an update.';
  }

  getWeatherDescription(code: number): string {
    if (code === 0) return 'Currently sunny';
    if (code === 1) return 'Mostly clear';
    if (code === 2) return 'Partly cloudy';
    if (code === 3) return 'Overcast';
    if (code === 45 || code === 48) return 'Foggy';
    if (code >= 51 && code <= 67) return 'Rainy';
    if (code >= 80 && code <= 82) return 'Rain showers';
    if (code >= 95) return 'Thunderstorms';

    return 'Changing weather';
  }

  getWeatherIcon(code: number, period: string): string {
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
      return '/assets/images/rain.png';
    }
    if (period === 'night') return '/assets/images/night.png';
    if (code >= 95) return '/assets/images/cloudy.png';
    if (code === 45 || code === 48 || (code >= 71 && code <= 77) ||
      (code >= 85 && code <= 86) || code === 2 || code === 3) {
      return '/assets/images/cloudy.png';
    }
    if (code === 0) return '/assets/images/sunny.png';
    return '/assets/images/clear-skies.png';
  }

  onSearchInput(): void {
    const query = this.searchTerm.trim();

    if (query.length < 2) {
      this.suggestions = [];
      return;
    }

    this.Weather.searchLocations(query).subscribe({
      next: (response) => {
        this.suggestions = response.results ?? [];
        this.crd.markForCheck();
      },
      error: () => {
        this.suggestions = [];
      },
    });
  }

  selectLocation(place: GeocodingLocation): void {
    this.searchTerm = place.name;
    this.suggestions = [];
    this.updateWeather(place);
  }

  updateWeather(place: GeocodingLocation): void {
    this.locationName = [place.name, place.admin1, place.country].filter(Boolean).join(', ');
    this.Weather.getCurrentWeather(place.latitude, place.longitude).subscribe({
      next: (weather) => {
        this.currentWeather = weather.current;
        this.isNight.set(weather.current.is_day === 0);

        const hoursWished = [
          { hour: '08', period: 'morning', label: 'Morning' },
          { hour: '12', period: 'noon', label: 'Noon' },
          { hour: '16', period: 'afternoon', label: 'Afternoon' },
          { hour: '21', period: 'night', label: 'Night' },
        ];

        this.forecastCards = hoursWished.map((time) => {
          const indice = weather.hourly.time.findIndex(
            (timeApi) => timeApi.slice(11, 13) === time.hour
          );

          if (indice === -1) {
            return null;
          }

          return {
            period: time.period,
            label: time.label,
            time: weather.hourly.time[indice].slice(11, 16),
            temperature: Math.round(weather.hourly.temperature_2m[indice]),
            description: this.getWeatherDescription(weather.hourly.weather_code[indice]),
            icon: this.getWeatherIcon(weather.hourly.weather_code[indice], time.period),
          };
        }).filter((card) => card !== null);

        this.weeklyCards = weather.daily.time.slice(1, 8).map((date, index) => {
          const dayIndex = index + 1;
          const code = weather.daily.weather_code[dayIndex];
          
          const [year, month, day] = date.split('-').map(Number);
          const dateObject = new Date(year, month - 1, day);

          const dateLabel = new Intl.DateTimeFormat(undefined, {day: 'numeric', month: 'short', }).format(dateObject);
          const dateWeek = new Intl.DateTimeFormat(undefined, { weekday: 'short', }).format(dateObject);

          return {
            date,
            dateLabel,
            dateWeek,
            isTomorrow: index === 0,
            temperatureMax: Math.round(weather.daily.temperature_2m_max[dayIndex]),
            temperatureMin: Math.round(weather.daily.temperature_2m_min[dayIndex]),
            description: this.getWeatherDescription(code),
            icon: this.getWeatherIcon(code, 'day'),
            windSpeed: Math.round(weather.daily.wind_speed_10m_max[dayIndex]),
            rainProbability: weather.daily.precipitation_probability_max[dayIndex] ?? null,
            windDirection: this.getWindDirection(weather.daily.wind_direction_10m_dominant[dayIndex]),
          };
        });

        this.crd.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching current weather:', error);
      },
    });
  }

  formatTemp(celsius: number): number {
    return this.unit() === 'C'
      ? Math.round(celsius)
      : Math.round((celsius * 9) / 5 + 32);
  }

  getWindDirection(degress: number): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degress / 45 % 8)];
  }
}
