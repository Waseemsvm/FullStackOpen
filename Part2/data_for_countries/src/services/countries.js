import axios from "axios";
const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const getAllCountries = () => {
    const request = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all");
    return request.then(response => response.data);
}

const getWeatherFor = (country) => {
    if (!country) return;
    let lat = country.capitalInfo.latlng[0]
    let lng = country.capitalInfo.latlng[1]

    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`);
    return request.then(response => response.data);
}

// const getWeatherIcon = (weather) => {
//     const request = axios.get(`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`);
//     return request.then(response => response.data);
// }


export default {
    getAllCountries,
    getWeatherFor,
    // getWeatherIcon
}