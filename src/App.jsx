import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInfo from './components/WeatherInfo/WeatherInfo'
import WeatherInfo5Days from './components/WeatherInfo5Days/WeatherInfo5Days'

function App() {

  const cityRef = useRef()
  const countryRef = useRef()

  const [weather, setWeather] = useState()
  const [weather5Days, setWeather5Days] = useState()
  const [error, setError] = useState()

  async function searchCity() {

    const city = cityRef.current.value
    const country = countryRef.current.value;
    const citySearch = `${city},${country}`

    const key = "50fb2801b4bd812962594a79bb11d2ad"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${key}&lang=pt_br&units=metric`
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${key}&lang=pt_br&units=metric`

    setError(null);

    try {
      const apiData = await axios.get(url)
      const apiData5Days = await axios.get(url5Days)
      setWeather(apiData.data)
      setWeather5Days(apiData5Days.data)

    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      setError("Não foi possível buscar o clima. Verifique se o nome da cidade e o país estão corretos.");
    }

  }

  return (
    <div className='container'>
      <h1>Previsão do Tempo</h1>
      <select name="country" id="country" ref={countryRef}>
        <option value="AF">Afghanistan (AF)</option>
        <option value="AL">Albania (AL)</option>
        <option value="DZ">Algeria (DZ)</option>
        <option value="AR">Argentina (AR)</option>
        <option value="AU">Australia (AU)</option>
        <option value="BR">Brazil (BR)</option>
        <option value="CA">Canada (CA)</option>
        <option value="CN">China (CN)</option>
        <option value="FR">France (FR)</option>
        <option value="DE">Germany (DE)</option>
        <option value="IN">India (IN)</option>
        <option value="IT">Italy (IT)</option>
        <option value="JP">Japan (JP)</option>
        <option value="MX">Mexico (MX)</option>
        <option value="RU">Russia (RU)</option>
        <option value="ZA">South Africa (ZA)</option>
        <option value="ES">Spain (ES)</option>
        <option value="SE">Sweden (SE)</option>
        <option value="CH">Switzerland (CH)</option>
        <option value="TR">Turkey (TR)</option>
        <option value="GB">United Kingdom (UK)</option>
        <option value="US">United States (US)</option>
      </select>
      <input type='text' placeholder='Digite o nome da Cidade' ref={cityRef} />
      <button onClick={searchCity}>Buscar</button>
      {error && <p style={{ color: 'white' }}>{error}</p>}
      {weather && <WeatherInfo weather={weather} />}
      {weather5Days && <WeatherInfo5Days weather5Days={weather5Days} />}
    </div>
  )
}

export default App
