type Weather = {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  pop: number;
  sys: {
    sunrise: number;
    sunset: number;
    pod: string;
  };
  visibility: number;
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
};

interface AppSlice {
  getLocation: null | LocationObject;
  weather: null | Weather;
  forecast: null | Weather[];
  loadingPermission: boolean;
  errorMessagePermission: null | string;
  permission: boolean;
  locationAuto: boolean;
}
