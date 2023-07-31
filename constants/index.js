export const apiKey = '8510feb9f4734805bb440844232707';

export const weatherAssets = {
  'Partly cloudy': {
    image: require('../assets/images/partlycloudy.png'),
    video: require('../assets/video/clouds.mp4'),
    description: 'Малооблачно',
  },
  'Moderate rain': {
    image: require('../assets/images/moderaterain.png'),
    video: require('../assets/video/rain.mp4'),
    description: 'Умеренный дождь',
  },
  'Patchy rain possible': {
    image: require('../assets/images/moderaterain.png'),
    video: require('../assets/video/rainClouds.mp4'),
    description: 'Возможен кратковременный дождь',
  },
  Sunny: {
    image: require('../assets/images/sun.png'),
    video: require('../assets/video/sunny.mp4'),
    description: 'Ясно',
  },
  Clear: {
    image: require('../assets/images/sun.png'),
    video: require('../assets/video/sunny.mp4'),
    description: 'Ясно',
  },
  Overcast: {
    image: require('../assets/images/cloud.png'),
    video: require('../assets/video/clouds.mp4'),
    description: 'Пасмурно',
  },
  Cloudy: {
    image: require('../assets/images/cloud.png'),
    video: require('../assets/video/clouds.mp4'),
    description: 'Облачно',
  },
  'Light rain': {
    image: require('../assets/images/moderaterain.png'),
    video: require('../assets/video/rain.mp4'),
    description: 'Небольшой дождь',
  },
  'Moderate rain at times': {
    image: require('../assets/images/moderaterain.png'),
    video: require('../assets/video/rainClouds.mp4'),
    description: 'Возможен сильный дождь',
  },
  'Heavy rain': {
    image: require('../assets/images/heavyrain.png'),
    video: require('../assets/video/rain.mp4'),
    description: 'Ливень',
  },
  'Heavy rain at times': {
    image: require('../assets/images/heavyrain.png'),
    video: require('../assets/video/rain.mp4'),
    description: 'Возможен ливень',
  },
  'Moderate or heavy freezing rain': {
    image: require('../assets/images/heavyrain.png'),
    video: require('../assets/video/rain.mp4'),
    description: 'Умеренный или сильный дождь',
  },
  'Moderate or heavy rain shower': {
    image: require('../assets/images/heavyrain.png'),
    video: require('../assets/video/rain.mp4'),
    description: 'Умеренный или сильный ливень',
  },
  'Moderate or heavy rain with thunder': {
    image: require('../assets/images/heavyrain.png'),
    video: require('../assets/video/thunder.mp4'),
    description: 'Умеренный или сильный дождь с грозой',
  },
  'Light rain shower': {
    image: require('../assets/images/moderaterain.png'),
    video: require('../assets/video/rain.mp4'),
    description: 'Грибной дождик',
  },
  Mist: {
    image: require('../assets/images/mist.png'),
    video: require('../assets/video/mist.mp4'),
    description: 'Туман',
  },
  Fog: {
    image: require('../assets/images/mist.png'),
    video: require('../assets/video/mist.mp4'),
    description: 'Туман',
  },
  other: {
    image: require('../assets/images/moderaterain.png'),
    video: require('../assets/video/rainClouds.mp4'),
    description: 'Другое',
  },
};

export const days = {
  Monday: { full: 'Понедельник', short: 'Пн' },
  Tuesday: { full: 'Вторник', short: 'Вт' },
  Wednesday: { full: 'Среда', short: 'Ср' },
  Thursday: { full: 'Четверг', short: 'Чт' },
  Friday: { full: 'Пятница', short: 'Пт' },
  Saturday: { full: 'Суббота', short: 'Сб' },
  Sunday: { full: 'Воскресенье', short: 'Вс' },
};
