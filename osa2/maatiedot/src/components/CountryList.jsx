const CountryList = ({ countries, searchName, handleCountryNameChange }) => {

  const countriesToShow = searchName === '' ? [] : countries.filter(country => country.name.common.toLowerCase().includes(searchName.toLowerCase()))
  
  if (countriesToShow.length == 1) {
    handleCountryNameChange(countriesToShow[0].name.common)
  }
  
  if (countriesToShow.length < 2) {
    return null
  } else if (countriesToShow.length > 10) {
    return (
      <p>Too many matches, try to be more specific</p>
    )
  } else {
    return (
      <ul>
        {countriesToShow.map(country =>
          <li key={country.cca2}>{country.flag} {country.name.common}</li>
        )}
      </ul>
    )
  }
}

export default CountryList