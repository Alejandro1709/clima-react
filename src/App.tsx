import styles from './App.module.css'
import Alert from './components/Alert/Alert'
import Form from './components/Form/Form'
import WeatherDetail from './components/WeatherDetail/WeatherDetail'
import useWeather from './hooks/useWeather'

function App() {
  const { weather, isLoading, notFound, fetchWeather, hasWeatherData } =
    useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />

        {isLoading ? <p>Loading...</p> : null}
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert>Ciudad No Encontrada</Alert>}
      </div>
    </>
  )
}

export default App
