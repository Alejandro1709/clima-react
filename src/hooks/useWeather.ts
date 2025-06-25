import axios from 'axios'
import * as z from 'zod'
import type { SearchType } from '../types'
import { useMemo, useState } from 'react'

// TYPE GUARD O ASSERTION

// function isWeatherResult(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === 'object' &&
//     typeof (weather as Weather).name === 'string' &&
//     typeof (weather as Weather).main.temp === 'number' &&
//     typeof (weather as Weather).main.temp_max === 'number' &&
//     typeof (weather as Weather).main.temp_min === 'number'
//   )
// }

// ZOD

const WeatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
})

export type Weather = z.infer<typeof WeatherSchema>

const initialState = {
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
}

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>(initialState)

  const [isLoading, setIsLoading] = useState(false)

  const fetchWeather = async (search: SearchType) => {
    setIsLoading(true)
    setWeather(initialState)

    try {
      const appId = import.meta.env.VITE_API_KEY
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

      const { data } = await axios.get(geoUrl)

      const lat = data[0].lat
      const lon = data[0].lon

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

      // Castear el type

      // const { data: weatherData } = await axios.get<Weather>(weatherUrl)
      // console.log(weatherData.main.temp)

      // Type Guards

      // const { data: weatherData } = await axios.get(weatherUrl)
      // const result = isWeatherResult(weatherData)

      // if (result) {
      //   console.log(weatherData.name)
      // }

      // ZOD

      const { data: weatherData } = await axios.get(weatherUrl)
      const result = WeatherSchema.safeParse(weatherData)

      if (result.success) {
        setWeather(result.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const hasWeatherData = useMemo(() => weather.name, [weather])

  return {
    weather,
    isLoading,
    fetchWeather,
    hasWeatherData,
  }
}
