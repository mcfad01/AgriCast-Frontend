function WeatherCard({ weather }) {
    if (!weather) return null

    const { main, weather: weatherInfo, wind, name } = weather
    const description = weatherInfo[0].description
    const iconCode = weatherInfo[0].icon

    return (
        <div className="d-flex flex-column gap-4">
            <div className="glass-panel text-center" style={{ minHeight: "486px" }}>
                <h5 className="text-start mb-5 d-flex align-items-center gap-2">
                    <img
                        src="https://img.icons8.com/3d-fluency/94/partly-cloudy-day.png"
                        alt="Weather"
                        style={{ width: 28, height: 28 }}
                    />
                    Current Weather
                </h5>

                <img className="mt-2"
                    src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                    alt={description}
                    style={{ width: "80px", height: "80px" }}
                />

                <div className="mb-2" style={{ fontSize: "6rem", fontWeight: 600, lineHeight: 1, }}>
                    {Math.round(main.temp)}°C
                </div>

                <div className="text-capitalize mt-3" style={{ opacity: 0.85 }}>
                    {description}
                </div>

                {name && (
                    <p className="mt-4 mb-0 small d-flex align-items-center justify-content-center gap-1" style={{ opacity: 0.7 }}>
                        <img
                            src="https://img.icons8.com/arcade/64/marker.png"
                            alt="Location"
                            style={{ width: 20, height: 20 }}
                        />
                        {name}
                    </p>
                )}
            </div>

            <div className="glass-panel">
                <div className="row text-center">
                    <div className="col-4">
                        <div className="small" style={{ opacity: 0.7 }}>Humidity</div>
                        <div className="fw-bold">{main.humidity}%</div>
                    </div>
                    <div className="col-4">
                        <div className="small" style={{ opacity: 0.7 }}>Wind</div>
                        <div className="fw-bold">{wind.speed} m/s</div>
                    </div>
                    <div className="col-4">
                        <div className="small" style={{ opacity: 0.7 }}>Feels like</div>
                        <div className="fw-bold">{Math.round(main.feels_like)}°C</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard