// fetcher.ts
import axios, { AxiosResponse } from 'axios';
import { Module, Commit } from 'vuex';

interface Condition {
  code: string;
  text: string;
}
interface Date {
  full: string;
  short: string;
}
interface Astro {
  is_moon_up: number;
  is_sun_up: number;
  moon_illumination: number;
  moon_phase: string;
  moonrise: string;
  moonset: string;
  sunrise: string;
  sunset: string;
}
interface Temperature {
  feelslike: number;
  pressure: number;
  temp: number;
  units: string;
}
interface Forecast {
  condition: Condition;
  humidity: number;
  imperial: Temperature;
  metric: Temperature;
  uv: number;
}
interface Astro {
  sunrise: string;
  sunset: string;
}
interface WeatherState {
  location: string;
  currentForecast: Forecast[];
  astro: Astro[];
  hourlyForecast: Forecast[];
  dailyForecast: Forecast[];
}
const state: WeatherState = {
  location: 'auto:ip',
  currentForecast: [],
  astro: [],
  hourlyForecast: [],
  dailyForecast: [],
};

const getters = {
  getCurrentForecast: (state: WeatherState) => state.currentForecast,
  getHourlyForecast: (state: WeatherState) => state.hourlyForecast,
  getDailyForecast: (state: WeatherState) => state.dailyForecast,
  getAstro: (state: WeatherState) => state.astro,
};

type CodesLibrary = {
  [key:string]: number[];
}
const codesLibrary:CodesLibrary = {
  "clear": [1000],
  "partly_cloudy": [1003],
  "cloudy": [1006],
  "overcast": [1009],
  "fog": [1135, 1147],
  "mist": [1030],
  "blizzard": [1114, 1117],
  "ice_pellets": [1237, 1261, 1264],
  "tstorm": [1087, 1273, 1276, 1279, 1282],
  "snow1": [1066, 1069],
  "snow2": [1210, 1213, 1255],
  "snow3": [1225],
  "snow4": [1216, 1219, 1258],
  "snow": [1222, 1258],
  "rain1": [1063, 1150],
  "rain2": [1204, 1180, 1168],
  "rain3": [1153, 1186, 1240, 1249, 1183, 1171],
  "rain4": [1189, 1198, 1207, 1243, 1252],
  "rain5": [1192, 1195, 1201, 1246]
}

function dataFilter(obj: any) {
  const result: any = [];
  for (const key in obj) {
    // Check if object is of type object
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // If yes, then run dataFilter function inside founded object
      result[key] = dataFilter(obj[key]);
    // If no, then run next in the current object
    } else {
      // Changes code property values to decoded one from codesLibrary
      if(key === 'code') {
        for(const decodedValue in codesLibrary){
          if(codesLibrary[decodedValue].includes(obj.code)) obj.code = decodedValue;
        }
      }
      // If any key of property in object has '_f, _in, _mph', then remove '_f, _in, _mph' parts from keys and place those properties in 'imperial' object
      if (/_(f|in|mph)$/.test(key)) {
        if (!result.imperial) result.imperial = {'units': '°F'};
        result.imperial[key.replace(/_(f|in|mph)$/, '')] = Math.round(obj[key]);
      // If any key of property in object has '_c, _mb, _mm, _kph', then remove '_c, _mb, _mm, _kph' parts from keys and place those properties in 'metric' object
      } else if (/_(c|mb|mm|kph)$/.test(key)) {
        if (!result.metric) result.metric = {'units': '°C'};
        result.metric[key.replace(/_(c|mb|mm|kph)$/, '')] = Math.round(obj[key]);
      // If non above, just leave properties as they are
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

interface RawHour {
  condition: Condition;
  feelslike_c: number;
  feelslike_f: number;
  temp_c: number;
  temp_f: number;
  time: string;
  time_epoch: number;
  uv: number;
}
interface RawDay {
  condition: Condition;
  date: Date;
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  uv: number;
}
interface ForecastDay {
  astro: Astro;
  date: string;
  date_epoch: number;
  day: RawDay;
  hour: RawHour[];
}
interface Location {
  country: string;
  lat: number;
  localtime: string;
  localtime_epoch: number;
  lon: number;
  name: string;
  region: string;
  tz_id: string;
}
interface Current {
  condition: Condition;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  pressure_in: number;
  pressure_mb: number;
  temp_c: number;
  temp_f: number;
}
interface RawForecast {
  current: Current;
  location: Location;
  forecast: {
    forecastday: ForecastDay[];
  };
}

const mutations = {
  setCurrentForecast(state: WeatherState, forecast: Current) {
    const filteredData = dataFilter(forecast);
    const currentTime = (): string => {
      const currentDate = new Date();
      const formatTimeUnit = (unit: number) => unit.toString().padStart(2, '0');
    
      const month = formatTimeUnit(currentDate.getMonth() + 1);
      const day = formatTimeUnit(currentDate.getDate());
      const hours = formatTimeUnit(currentDate.getHours());
      const minutes = formatTimeUnit(currentDate.getMinutes());
    
      return `${hours}:${minutes} • ${day}/${month}`;
    };
    state.currentForecast = { ...filteredData, time: currentTime() };
  },
  setAstro(state: WeatherState, astro: Astro) {
    state.astro = dataFilter(astro);
  },
  setHourlyForecast(state: WeatherState, forecast: ForecastDay[]) {
    // Combine forecast hours into a single array
    let flattenedForecast:RawHour[] = forecast.flatMap((day:ForecastDay) => day.hour);
    // Add time stams for interface
    flattenedForecast = flattenedForecast.map((obj:any, index:number) => {
      const hour: number = (index) % 12 || 12; // Calculate the hour (1-12)
      const period: string = Math.floor((index-1)/12) % 2 ? 'PM' : 'AM'; // Determine AM/PM
      return {
        ...obj,
        time: [hour, period]
      }; // Create a new object with the added property
    });
    // Slice the next 23 hours based on current hour
    const now: number = (new Date()).getHours();
    flattenedForecast = flattenedForecast.slice(now, now + 24);
  
    // Filter and update state
    state.hourlyForecast = dataFilter(flattenedForecast);
  },
  setDailyForecast(state: WeatherState, forecast: ForecastDay[]) {
    const dailyForecast:RawDay[] = forecast.map((obj:ForecastDay) => obj.day);

    const updatedForecast:RawDay[] = [];
    dailyForecast.forEach((obj: RawDay, index: number) => {
      function addCreatedTime() {
        const now = new Date();
        const currentDate = now.getDate();
        now.setDate(currentDate + index);
        const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'short' });
        const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return { full: date, short: dayOfWeek };
      }
      obj.date = addCreatedTime();
      return updatedForecast.push(obj);
    });
    const filteredData = dataFilter(updatedForecast);
    state.dailyForecast = filteredData;
  },
};

const actions = {
  async fetchWeatherForecast({ commit, state }: { commit: Commit, state: WeatherState }) {
    const API_KEY = '0f0c9fea271b40bc90d104247240706';
    try {
      const response: AxiosResponse<RawForecast> = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${state.location}&days=3`
      );
      commit('setCurrentForecast', response.data.current);
      commit('setAstro', response.data.forecast.forecastday[0].astro);
      commit('setHourlyForecast', response.data.forecast.forecastday);
      commit('setDailyForecast', response.data.forecast.forecastday);
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
    }
  },
};

const weatherModule: Module<WeatherState, any> = {
  state,
  getters,
  mutations,
  actions,
};

export default weatherModule;