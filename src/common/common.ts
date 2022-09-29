export const ThunderstormStatus = [
  200, 201, 202, 210, 211, 212, 221, 230, 231, 232,
];

export const DrizzleStatus = [300, 301, 302, 310, 311, 312, 313, 314, 321];

export const RainStatus = [500, 501, 502, 503, 504, 511, 520, 521, 522, 531];

export const SnowStatus = [
  600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622,
];

export const AtmosphereStatus = [
  701, 711, 721, 731, 741, 751, 761, 762, 771, 781,
];

export const ClearStatus = [800];

export const CloudsStatus = [801, 802, 803, 804];

export const IMAGE_BY_STATUS = {
  thunderstorm: {
    day: require('../assets/png/thunderstormD.png'),
    night: require('../assets/png/thunderstormN.png'),
  },
  drizzle: {
    day: require('../assets/png/atmosphereD.png'),
    night: require('../assets/png/atmosphereD.png'),
  },
  rain: {
    day: require('../assets/png/rainD.png'),
    night: require('../assets/png/rainN.png'),
  },
  snow: {
    day: require('../assets/png/snowD.png'),
    night: require('../assets/png/snowN.png'),
  },
  atmosphere: {
    day: require('../assets/png/atmosphereD.png'),
    night: require('../assets/png/atmosphereN.png'),
  },
  clear: {
    day: require('../assets/png/clearD.png'),
    night: require('../assets/png/clearN.png'),
  },
  cloud: {
    day: require('../assets/png/cloudsD.png'),
    night: require('../assets/png/cloudsN.png'),
  },
  unknown: {
    day: require('../assets/png/day.png'),
    night: require('../assets/png/night.png'),
  },
};

export const colorByType: any = {
  thunderstorm: {
    day: {
      r: 17,
      g: 17,
      b: 37,
    },
    night: {
      r: 17,
      g: 17,
      b: 37,
    },
  },
  rain: {
    day: {
      r: 81,
      g: 71,
      b: 116,
    },
    night: {
      r: 112,
      g: 55,
      b: 104,
    },
  },
  snow: {
    day: {
      r: 60,
      g: 72,
      b: 240,
    },
    night: {
      r: 99,
      g: 22,
      b: 133,
    },
  },
  atmosphere: {
    day: {
      r: 86,
      g: 121,
      b: 185,
    },
    night: {
      r: 86,
      g: 121,
      b: 185,
    },
  },
  clear: {
    day: {
      r: 64,
      g: 164,
      b: 255,
    },
    night: {
      r: 0,
      g: 0,
      b: 0,
    },
  },
  cloud: {
    day: {
      r: 81,
      g: 71,
      b: 116,
    },
    night: {
      r: 81,
      g: 71,
      b: 116,
    },
  },
  unknown: {
    day: {
      r: 26,
      g: 16,
      b: 4,
    },
    night: {
      r: 8,
      g: 10,
      b: 32,
    },
  },
};

export const getTypeStatus = (status: number) => {
  if (ThunderstormStatus.includes(status)) {
    return 'thunderstorm';
  } else if (RainStatus.includes(status)) {
    return 'rain';
  } else if (SnowStatus.includes(status)) {
    return 'snow';
  } else if (
    AtmosphereStatus.includes(status) ||
    DrizzleStatus.includes(status)
  ) {
    return 'atmosphere';
  } else if (ClearStatus.includes(status)) {
    return 'clear';
  } else if (CloudsStatus.includes(status)) {
    return 'cloud';
  }
  return 'unknown';
};

export const getDirection = (deg: number) => {
  if (deg > 337.5) {
    return 'North';
  }
  if (deg > 292.5) {
    return 'North West';
  }
  if (deg > 247.5) {
    return 'West';
  }
  if (deg > 202.5) {
    return 'South West';
  }
  if (deg > 157.5) {
    return 'South';
  }
  if (deg > 122.5) {
    return 'South East';
  }
  if (deg > 67.5) {
    return 'East';
  }
  if (deg > 22.5) {
    return 'North East';
  }
  return 'North';
};

export const getMoment = (sunrise: number, sunset: number) => {
  const now = new Date().getTime() / 1000;
  if (now > sunrise && now < sunset) {
    return 'day';
  }
  return 'night';
};

export const getIcon = (name: string, moment: string): any => {
  const momentLetter = moment === 'day' ? 'd' : 'n';
  return `https://openweathermap.org/img/wn/${name}@4x.png`;
};

// A stocké via une couche entre app et api
export const API_KEY = '5f3d421c789c40e4aaf0c1561c20b22c';
