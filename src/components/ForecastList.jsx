import { Save } from "lucide-react"

function ForecastList({ forecast, onSaveClick }) {
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
            <h4 className="mb-3">5 Day Forecast</h4>

            <div className="d-flex flex-column gap-2">
                {forecast.map((day) => (
                    <div
                        key={day.date}
                        className="d-flex align-items-center justify-content-between p-3 flex-wrap gap-2"
                        style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            borderRadius: "12px",
                            border: "1px solid rgba(255, 255, 255, 0.15)"
                        }}
                    >
                        <div style={{ minWidth: "80px" }}>
                            <div className="fw-bold">{formatDay(day.date)}</div>
                            <div className="small" style={{ opacity: 0.7 }}>
                                {formatDate(day.date)}
                            </div>
                        </div>

                        <div className="text-center flex-grow-1">
                            <div className="fw-bold small">{day.condition}</div>
                            <div className="small" style={{ opacity: 0.7 }}>
                                💧 {day.rainChance}%
                            </div>
                        </div>

                        <div className="text-end" style={{ minWidth: "90px" }}>
                            <div>
                                <span className="fw-bold">{day.tempMax}°</span>
                                <span style={{ opacity: 0.7 }}> / {day.tempMin}°</span>
                            </div>
                            <div className="small" style={{ opacity: 0.6 }}>
                                💨 {day.windSpeed} m/s
                            </div>
                        </div>

                        <button
                            type="button"
                            className="btn-glass d-flex align-items-center gap-1"
                            onClick={() => onSaveClick(day)}
                            title="Save this date"
                        >
                            <Save size={14} />
                            Save
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ForecastList