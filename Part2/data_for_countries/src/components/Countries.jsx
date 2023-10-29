import { useState } from 'react';
import countriesService from '../services/countries'
import { Languages } from './Languages';
import { Weather } from './Weather';

const Countries = (props) => {
    const countries = props.data.countries;
    const query = props.data.query;
    const showDetails = props.data.showDetails;
    // const latLng = props.data.latLng;

    // const [latLng, setLatLng] = useState(null);
    const [weather, setWeather] = useState(null);
    const [activeCountry, setActiveCountry] = useState(null);

    //find the country with the name same as that of query string
    let country = countries.find(country => country.name.common.toLowerCase() === query.toLowerCase());
    let requestedCountries;
    //if the country name matches with the query exactly then show it.
    if (country)
        requestedCountries = [country]

    //otherwise filter all the countries with the query string
    if (!requestedCountries) {
        requestedCountries = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()));
    }

    //if the length of the countries is more ask for specificity
    if (requestedCountries.length > 10) {
        //if query is not provided then return null
        if (!query) return null;
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    //if only one country then show its details
    if (requestedCountries.length === 1) {
        // console.log(requestedCountries[0]);

        if (activeCountry !== requestedCountries[0]) {
            setActiveCountry(requestedCountries[0]);
            countriesService.getWeatherFor(requestedCountries[0]).then(response => {
                setWeather(response);
            })
        }

        return (
            <div>
                <h1> {requestedCountries[0].name.common} </h1>
                <span>capital {requestedCountries[0].capital[0]}</span><br />
                <span>area {requestedCountries[0].area}</span>
                <Languages languages={requestedCountries[0].languages} />
                <img height="150px" src={requestedCountries[0].flags.png} alt={requestedCountries[0].flags.alt} />
                <Weather capital={requestedCountries[0].capital[0]} weather={weather} />
            </div>
        );
    }

    //if the length of the countries is lessthan or equal to 10 then display the list
    return (
        <ul>
            {
                requestedCountries.map(country => {
                    return <li key={country.name.common} > {country.name.common} <button onClick={() => {
                        showDetails(country)
                    }}>show</button></li>
                })
            }
        </ul>
    );
}

export {
    Countries
}