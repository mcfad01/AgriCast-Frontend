function ForecastList({ forecast }) {
    if (!forecast || forecast.length === 0) return null

    const formatDay = (dateStr) => {
        const date = new Date(dateStr + "T12:00:00")
        return date.toLocaleDateString("en-US", { weekday: "short" })
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr + "T12:00:00")
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }

    return (
        <div className="glass-panel">
                <h5 className="text-start mb-5 d-flex align-items-center gap-2">
                    <img
                        src="https://img.icons8.com/external-flat-design-circle/64/external-Eco-Calender-ecology-flat-design-circle.png"
                        alt="Weather"
                        style={{ width: 28, height: 28 }}
                    />
                    5-Days Forecast
                </h5>

            <div className="d-flex flex-column gap-2">
                {forecast.map((day) => (
                    <div
                        key={day.date}
                        className="d-flex align-items-center justify-content-between p-3"
                        style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            borderRadius: "12px",
                            border: "1px solid rgba(255, 255, 255, 0.15)"
                        }}
                    >
                        <div style={{ minWidth: "80px" }}>
                            <div className="fw-bold">{formatDay(day.date)}</div>
                            <div className="small" style={{ opacity: 0.6 }}>
                                {formatDate(day.date)}
                            </div>
                        </div>

                        <div className="text-center flex-grow-1">
                            <div className="fw-bold small">{day.condition}</div>
                            <div className="small" style={{ opacity: 0.6 }}>
                                💧 {day.rainChance}%
                            </div>
                        </div>

                        <div className="text-end" style={{ minWidth: "90px" }}>
                            <div>
                                <span className="fw-bold">{day.tempMax}°</span>
                                <span style={{ opacity: 0.7 }}> / {day.tempMin}°</span>
                            </div>
                            <div className="small" style={{ opacity: 0.8 }}>
                                💨 {day.windSpeed} m/s
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ForecastList