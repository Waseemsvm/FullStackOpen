const Weather = ({ capital, weather }) => {

    if (!capital || !weather) return;

    return (
        <>
            <h2>Weather in {capital}</h2>
            <p>temperature {weather?.main.temp}</p>
            <img src={weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
        </>
    );
}


export {
    Weather
}