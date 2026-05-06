import { useState, useEffect } from "react"
import axios from "axios"

const SearchBar = ({ searchString, handleChangeSearch }) => 
<div>
  find countries: <input value={searchString} onChange={handleChangeSearch} />
</div>

const CountryDisplay = ({ countries, weather, handleSetCountries }) => {
  if(countries.length >= 10)
    return(
      <div>Too many matches, specify another filter</div>
    )
  if(countries.length === 1)
    return(<CountryDetails country={countries[0]} weather={weather}/>)
  if(countries.length === 0)
    return(<div>No matches</div>)
  return(
    countries.map(country => <CountryListItem country={country} handleSetCountries={() => handleSetCountries(country)} key={country.name.common}/>)
  )
}

const CountryDetails = ({ country, weather }) => 
<>
  <h1>{country.name.common}</h1>
  <div>Capital {country.capital}</div>
  <div>Area {country.area}</div>
  <LanguageList languages={Object.values(country.languages)} />
  <img src={country.flags.png} alt={country.flags.alt} />
  <WeatherDisplay country={country} weather={weather} />
</>

const WeatherDisplay = ({ country, weather }) => 
<>
  <h1>Weather in {country.capital}</h1>
  <div>Temperature {weather.temperature} Celcius</div>
  <img src={`https://openweathermap.org/payload/api/media/file/${weather.iconCode}.png`} alt="Could not source weather icon" />
  <div>Wind {weather.wind} m/s</div>
</>

const LanguageList = ({ languages }) => 
<>
  <h1>Languages</h1>
  <ul>
    {languages.map(lang => <li key={lang}>{lang}</li>)}
  </ul>
</>

const CountryListItem = ({ country, handleSetCountries }) =>
  <div>{country.name.common}<button onClick={handleSetCountries}>Show</button></div>

const App = () => {
  const [ allCountries, setAllCountries ] = useState([])
  const [ searchString, setSearchString ] = useState('')
  const [ countries, setCountries] = useState([])
  const [ weather, setWeather ] = useState({
    temperature: "Default temperature",
    wind: "Default wind speed",
    iconCode: "01d"
  })

  const handleChangeSearch = (e) => {
    setSearchString(e.target.value)
    setCountries(allCountries.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const handleSetCountries = (country) => 
  {
    setCountries([country])
    setSearchString(country.name.common)
  }

  // We can get a list of all the countries from a single API call and do any filtering we need locally
  // This cuts down on unnessecary API calls since it's unlikely that the list of countries in the world
  // will change while this app is open
  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then((response) => setAllCountries(response.data))
  }, [])

  useEffect(() => {
    if(countries.length === 1)
    {
      const country = countries[0]
      const lat = country.capitalInfo.latlng[0]
      const lon = country.capitalInfo.latlng[1]
      
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
      .then(response => {
        const currentWeather = response.data
        setWeather({
          temperature: currentWeather.main.temp,
          wind: currentWeather.wind.speed,
          iconCode: currentWeather.weather[0].icon
        })
      }) 
    }
  }, [countries])

  return (
    <div>
      <SearchBar searchString={searchString} handleChangeSearch={handleChangeSearch} />
      <CountryDisplay countries={countries} weather={weather} handleSetCountries={handleSetCountries} />
    </div>
  )
}


export default App