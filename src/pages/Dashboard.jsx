import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import WeatherCard from "../components/WeatherCard"
import ForecastList from "../components/ForecastList"
import { getCurrentWeather, getForecast, groupForecastByDay } from "../api/weather"
import { Sun } from "lucide-react"
import { getSavedDates } from "../api/savedDates"
import SaveDateModal from "../components/SaveDateModal"
import { createSavedDate } from "../api/savedDates"


function Dashboard() {
    const { user } = useSelector((state) => state.auth)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [forecast, setForecast] = useState([])
    const [weatherLoading, setWeatherLoading] = useState(true)
    const [weatherError, setWeatherError] = useState("")
    const [savedCount, setSavedCount] = useState(0)
    const [selectedDay, setSelectedDay] = useState(null)

    const location = user?.farmLocation

    useEffect(() => {
        if (!location?.latitude || !location?.longitude) {
            setWeatherLoading(false)
            return
        }

        const fetchWeather = async () => {
            setWeatherLoading(true)
            setWeatherError("")

            try {
                const [current, forecastData] = await Promise.all([
                    getCurrentWeather(location.latitude, location.longitude),
                    getForecast(location.latitude, location.longitude)
                ])

                setCurrentWeather(current)
                setForecast(groupForecastByDay(forecastData.list))
            } catch (error) {
                console.log(error)
                setWeatherError("Could not load weather data. Please try again.")
            } finally {
                setWeatherLoading(false)
            }
        }

        fetchWeather()
    }, [location?.latitude, location?.longitude])

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await getSavedDates()
                setSavedCount(response.data.length)
            } catch (err) {
                console.log(err)
            }
        }
        fetchCount()
    }, [])
    const handleSaveClick = (day) => {
        setSelectedDay(day)
    }

    const handleSaveDate = async (data) => {
        await createSavedDate(data)
        const response = await getSavedDates()
        setSavedCount(response.data.length)
    }

    return (
        <>
            {/* Greeting */}
            <div className=" mb-5">
                <div className="d-flex align-items-center gap-3">
                    <div className="glass-icon">
                        <Sun size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h1 className="mb-1" style={{ fontSize: "1.75rem", color: "#ffffff" }}>
                            Hello, {user?.fullname}
                        </h1>
                        <p className="mb-0" style={{ fontSize: "0.80rem", opacity: 0.70, color: "#ffffffb9" }}>{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Weather section */}
            {!location?.latitude || !location?.longitude ? (
                <div className="glass-panel mb-4">
                    <h5 className="mb-3"> Farm Location Needed</h5>
                    <p>Set your farm location to see the weather forecast.</p>
                    <Link to="/profile" className="btn-glass-green d-inline-block">
                        Set Location
                    </Link>
                </div>
            ) : weatherLoading ? (
                <div className="glass-panel mb-4 text-center">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 mb-0">Fetching weather for your farm...</p>
                </div>
            ) : weatherError ? (
                <div className="glass-panel mb-4">
                    <div className="alert alert-danger mb-0">{weatherError}</div>
                </div>
            ) : (
                <>
                    <div className="row mb-4">
                        <div className="col-md-5 mb-3 mb-md-0">
                            <WeatherCard weather={currentWeather} />
                        </div>
                        <div className="col-md-7">
                            <ForecastList forecast={forecast} onSaveClick={handleSaveClick} />
                        </div>
                    </div>
                </>
            )}

            {/* Farm location card */}
            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <div className="glass-panel h-100">
                        <h5 className="mb-3"> Farm Location</h5>
                        {location?.city ? (
                            <>
                                <p className="mb-1">
                                    <strong>{location.city}</strong>
                                </p>
                                <p className="small mb-0" style={{ opacity: 0.75 }}>
                                    Lat: {location.latitude}, Lng: {location.longitude}
                                </p>
                            </>
                        ) : (
                            <p>No location set yet.</p>
                        )}
                        <Link to="/profile" className="btn-glass-green d-inline-block mt-3">
                            Update Location
                        </Link>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <div className="glass-panel h-100">
                        <h5 className="mb-3"> Saved Dates</h5>
                        <p style={{ opacity: 0.85 }}>
                            {savedCount === 0
                                ? "No saved dates yet."
                                : `You have ${savedCount} saved date${savedCount !== 1 ? "s" : ""}.`
                            }
                        </p>
                        <Link to="/saved-dates" className="btn-glass-green d-inline-block mt-3">
                            View All
                        </Link>
                    </div>
                </div>
            </div>

            <SaveDateModal
                day={selectedDay}
                onClose={() => setSelectedDay(null)}
                onSave={handleSaveDate}
            />
        </>
    )
}

export default Dashboard