import { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
import { Countries } from './components/Countries';
import countriesService from './services/countries';


function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  const hook = () => {
    if (!query) setCountries([]);
    countriesService.getAllCountries().then(response => {
      setCountries(response);
    });
  }

  useEffect(hook, [query]);

  const handleQuery = (event) => {
    setQuery(event.target.value)
  }

  const showDetails = (countryObj) => {
    console.log(countryObj.capitalInfo.latlng);
    setQuery(countryObj.name.common);
  }

  return (
    <>
      <Filter handleQuery={handleQuery} query={query} />
      <Countries data={{ countries: countries, query: query, showDetails: showDetails }} />
    </>
  )
}

export default App
