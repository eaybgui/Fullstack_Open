import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Country from './components/Country'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data));
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  let filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearch} />
      </div>
      <div>
        {filteredCountries.length > 10 ? <p>Too many matches, specify another filter</p> :
        filteredCountries.length === 1 ? <Country country={filteredCountries[0]} showInfo={true}/> : 
        filteredCountries.map(country => <Country key={country.name.common} country={country} showInfo={false}/>)}
      </div>
    </div>
  )

}

export default App;
