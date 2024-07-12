import { DateTime } from "luxon"

const API_KEY = "b02a5919f2db11568c3bfd3ebba24d55"
// const API_KEY = "dd5a266ab42fd864401d00ac25b0b107"
// const API_KEY = "e8fb5b95f2a7544a77eac45696799e10"
const base_URL = "https://api.openweathermap.org/data/2.5/"

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// https://api.openweathermap.org/data/2.5/ -> base url
// https://api.openweathermap.org/data/2.5/weather -> base url+ info type (i.e url)
// ?lat={lat}&lon={lon}&appid={API key} -> query parameters (starts w/ "?" and use "&" for multiple params)

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(base_URL + infoType)
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  return fetch(url).then((res) => res.json());
  }
  
  // fetch(url).then((res) => res.json());
  // fetch(url) -> makes HTTP GET req form URL
  // 'fetch' function in JavaScript returns a Promise
  // '.then' fucntion used with "promise", used for things to do after complition (or fail) of an asynchronous operation and some value afterwards
  // .then((res) => res.json()); -> after getting the response from api,the arrow funtion will be executed, we are making that value into a json file, using json().

const iconURL = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`
// iconURL is an arrow function , takes in icon id and returns an url to get the icon.

const formatLocalTime =
  (secs, offset, format = "cccc, dd LLLL yyyy'  |  Local time: 'hh:mm a") =>
    DateTime.fromSeconds(secs + offset, { zone: 'utc' }).toFormat(format)
// formatLocalTime is an arrow func, with prams secs,offset,format which is been passed in to a DateTime function(imported form Luxon), which converts time by taking in prams to a particular formate. 

const formateCurrent = (data) => {
  // an arrow func w/ data passed in it as a prams
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity }
    , name,
    dt,
    sys: { country, sunrise, sunset },
    weather, wind: { speed }, timezone,
  } = data;
  // this is called object destructuring 
// here we are using nested destructuring, where we go one step more deep in the object, ex-> we are extracting data.coord.lon and saving that info in lon variable, to change the variable name use ':' ex-> const{ coord:{longitude:lon,lat}} this will save lon in longitude and lat in lat.

  const { main: details, icon } = weather[0]
  // this is also destructuring 
// extracting main and icon form weather array,and naming the var to details holding val of weather.main


  const formattedLocalTime = formatLocalTime(dt, timezone)
  // saving the return val of formatLocalTime with params passed.

  return {
    temp, feels_like, temp_min, temp_max, humidity, name, country, sunrise,
    sunrise: formatLocalTime(sunrise, timezone, "hh:mm a"),
    // saving sunrise as a var with return val of formatLocalTime(sunrise, timezone, "hh:mm a")
    sunset: formatLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: iconURL(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon
  };
};

// hourly
const formatForcastWeather = (secs, offset, data) => {
  const hourly = data.filter((f) => f.dt > secs)
  .map((f) => ({
    temp: f.main.temp,
    title: formatLocalTime(f.dt, offset, 'hh:mm a'),
    icon: iconURL(f.weather[0].icon),
    date: f.dt_txt
  }))
  .slice(0, 5)
  // it filters out the data, i.e future data(f.dt > secs)
  // then maps over the filter, extracting data and assigning it to a var
  // filter funtion makes new array w/ all elements which passes the funtion req. (here it should be greater then secs i.e current time means we need future data)
  // then slicing all that to just 5 elements

  // daily
  const daily=data.filter((f)=>f.dt_txt.slice(-8)==="00:00:00")
  // .slice(-8), means slicing 8 character form behind the string i.e HH:MM:SS
  // ==="00:00:00" cheks if its midnight, we need all the data form midnight

  .map((f) => ({
    temp: f.main.temp,
    title: formatLocalTime(f.dt, offset, 'hh:mm a'),
    icon: iconURL(f.weather[0].icon),
    date: f.dt_txt
  }))
  return { hourly , daily };
}

const getDataFormatted = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData('weather', searchParams)
  // will wait for weather info to come
  .then(formateCurrent);
  // after getting api response, we will formate it according to our prefrence.

  const { dt, lat, lon, timezone } = formattedCurrentWeather 
  // destructuring dt, etc form formattedCurrentWeather,
  // dt=formattedCurrentWeather.dt

  const formattedForcastWeather = await getWeatherData('forecast', { lat, lon, units: searchParams.units }).then((d) => formatForcastWeather(dt, timezone, d.list))
  // "formattedForcastWeather" is a variable storing data of return value of "formattedForcastWeather" with given prams and waiting it to return, and then that data is passed to "formattedForcastWeather" to get a formated data accordign to ous.

  return { ...formattedCurrentWeather , ...formattedForcastWeather};
}
export default getDataFormatted;