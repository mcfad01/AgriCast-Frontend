import { useState, useEffect } from "react"
import { X } from "lucide-react"


function SaveDateModal({ day, onClose, onSave }) {
    const [note, setNote] = useState("")
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        setNote("")
        setError("")
    }, [day])

    if (!day) return null

    const handleSave = async () => {
        setSaving(true)
        setError("")

        try {
            await onSave({
                date: day.date,
                note,
                weather: {
                    temp: day.tempAvg,
                    humidity: day.humidity,
                    rainChance: day.rainChance,
                    windSpeed: day.windSpeed,
                    condition: day.condition
                }
            })
            onClose()
        } catch (err) {
            const msg = err?.response?.data?.message || "Could not save date. Please try again."
            setError(msg)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0, 0, 0, 0.65)",
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                padding: "24px"
            }}
            onClick={onClose}
        >
            <div
                className="glass-panel"
                style={{ maxWidth: "480px", width: "100%" }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="mb-0">Save this date</h3>
                    <button
                        type="button"
                        className="btn-glass"
                        onClick={onClose}
                        style={{ padding: "4px 8px" }}
                    >
                        <X size={16} />
                    </button>
                </div>

                <p className="mb-3" style={{ opacity: 0.85 }}>
                    <>
                        {new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "short",
                            day: "numeric"
                        })}
                    </>
                </p>

                <p className="small mb-4" style={{ opacity: 0.7 }}>
                    🌡️ {day.tempAvg}°C · 💧 {day.humidity}% · 🌧️ {day.rainChance}% · 💨 {day.windSpeed} m/s · ☁️ {day.condition}
                </p>

                {error && <div className="alert alert-danger">{error}</div>}

                <label className="form-label">Note (optional)</label>
                <textarea
                    className="form-control auth-input mb-3"
                    rows="3"
                    placeholder="e.g., Good for planting maize"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    maxLength={500}
                />

                <div className="d-flex gap-2 justify-content-end">
                    <button type="button" className="btn-glass" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn-glass-green"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Date"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SaveDateModal