const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export const getCurrentWeather = async (lat, lon) => {
    const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_KEY}`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch current weather")
    }

    return response.json()
}

export const getForecast = async (lat, lon) => {
    const response = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_KEY}`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch forecast")
    }

    return response.json()
}

export const groupForecastByDay = (forecastList) => {
    const days = {}

    forecastList.forEach((item) => {
        const date = item.dt_txt.split(" ")[0]

        if (!days[date]) {
            days[date] = {
                date,
                temps: [],
                rainChances: [],
                conditions: [],
                humidity: [],
                windSpeed: []
            }
        }

        days[date].temps.push(item.main.temp)
        days[date].rainChances.push(item.pop * 100)
        days[date].conditions.push(item.weather[0].main)
        days[date].humidity.push(item.main.humidity)
        days[date].windSpeed.push(item.wind.speed)
    })

    return Object.values(days).map((day) => {
        const midIndex = Math.floor(day.temps.length / 2)

        return {
            date: day.date,
            tempMin: Math.round(Math.min(...day.temps)),
            tempMax: Math.round(Math.max(...day.temps)),
            tempAvg: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length),
            rainChance: Math.round(Math.max(...day.rainChances)),
            humidity: Math.round(day.humidity[midIndex]),
            windSpeed: day.windSpeed[midIndex],
            condition: day.conditions[midIndex]
        }
    })
}