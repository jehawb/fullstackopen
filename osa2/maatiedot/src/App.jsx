import { useEffect, useState } from 'react'
import CountryList from './components/CountryList'
import CountrySearch from './components/CountrySearch'
import countriesREST from './services/countriesREST'

function App() {
  const [countries, setCountries] = useState([])
  const [countryName, setCountryName] = useState('')
  const [searchName, setSearchName] = useState('')
  const [country, setCountry] = useState([])

  useEffect(() => {
    getAllCountries()
  }, [])

  // Functions

  const getAllCountries = () => {
    countriesREST
      .getAll()
      .then(fetchedCountries => {
        setCountries(fetchedCountries)
      })
  }

  const getCountry = () => {
    countriesREST
      .getCountry(countryName)
      .then(fetchedCountry => {
        console.log(fetchedCountry)
        setCountry(fetchedCountry)
      })
  }

  // Handles

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  const handleCountryNameChange = (countryName) => {
    setCountryName(countryName)
    console.log(countryName)
    // getCountry(countryName)
  }

  return (
    <>
      <CountrySearch
        searchName={searchName}
        handleSearchNameChange={handleSearchNameChange} />

      <CountryList
        countries={countries}
        searchName={searchName}
        handleCountryNameChange={handleCountryNameChange} />

      <p>{countryName}</p>
    </>
  )
}

export default App
