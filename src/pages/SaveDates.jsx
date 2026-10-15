import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Calendar, Trash2, Pencil } from "lucide-react"
import EditNoteModal from "../components/EditNoteModal"
import { getSavedDates, deleteSavedDate, updateSavedDate } from "../api/savedDates"
import ConfirmModal from "../components/ConfirmModal"

function SaveDates() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    const [savedDates, setSavedDates] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [confirmId, setConfirmId] = useState(null)
    const [editingItem, setEditingItem] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await getSavedDates()
                setSavedDates(response.data)
            } catch (err) {
                console.log(err)
                setError("Could not load your saved dates.")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const confirmDelete = async () => {
        if (!confirmId) return

        try {
            await deleteSavedDate(confirmId)
            setSavedDates((prev) => prev.filter((item) => item._id !== confirmId))
            setConfirmId(null)
        } catch (err) {
            console.log(err)
            alert("Could not delete. Please try again.")
        }
    }
    const handleEditNote = async (id, newNote) => {
        await updateSavedDate(id, newNote)
        setSavedDates((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, note: newNote } : item
            )
        )
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric"
        })
    }

    return (
        <>
            {/* Header */}
            <div className="glass-panel mb-4">
                <div className="d-flex align-items-center gap-3">
                    <div className="icon-badge">
                        <Calendar size={28} strokeWidth={2} />
                    </div>
                    <div>
                        <h4 className="mb-1">Saved Dates</h4>
                        <p className="mb-0" style={{ opacity: 0.85 }}>
                            {savedDates.length} date{savedDates.length !== 1 ? "s" : ""} saved
                        </p>
                    </div>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="glass-panel text-center">
                    <div className="spinner-border text-light" role="status"></div>
                    <p className="mt-3 mb-0">Loading your saved dates...</p>
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="glass-panel">
                    <div className="alert alert-danger mb-0">{error}</div>
                </div>
            )}

            {/* Empty state */}
            {!loading && !error && savedDates.length === 0 && (
                <div className="glass-panel text-center">
                    <h5 className="mb-3">📅 No saved dates yet</h5>
                    <p>When you spot a favorable weather day on the Dashboard, save it here.</p>
                    <button
                        className="btn-glass-green mt-2"
                        onClick={() => navigate("/dashboard")}
                    >
                        Go to Dashboard
                    </button>
                </div>
            )}

            {/* List */}
            {!loading && !error && savedDates.length > 0 && (
                <div className="d-flex flex-column gap-3">
                    {savedDates.map((item) => (
                        <div key={item._id} className="glass-panel">
                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="mb-0">{formatDate(item.date)}</h5>
                                    <div className="d-flex gap-2">
                                        <button
                                            type="button"
                                            className="btn-glass d-flex align-items-center gap-1"
                                            onClick={() => setEditingItem(item)}
                                            title="Edit note"
                                            style={{ padding: "4px 10px", fontSize: "0.8rem" }}
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-glass d-flex align-items-center gap-1"
                                            onClick={() => setConfirmId(item._id)}
                                            title="Delete this date"
                                            style={{ padding: "4px 10px", fontSize: "0.8rem" }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                <p className="mb-2" style={{ opacity: 0.85 }}>
                                    {item.note || <em>No note added</em>}
                                </p>

                                {item.weather && (
                                    <div className="d-flex flex-wrap gap-3 small" style={{ opacity: 0.75 }}>
                                        {item.weather.temp && <span>🌡️ {item.weather.temp}°C</span>}
                                        {item.weather.humidity && <span>💧 {item.weather.humidity}%</span>}
                                        {item.weather.rainChance !== undefined && (
                                            <span>🌧️ {item.weather.rainChance}%</span>
                                        )}
                                        {item.weather.windSpeed && <span>💨 {item.weather.windSpeed} m/s</span>}
                                        {item.weather.condition && <span>☁️ {item.weather.condition}</span>}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <ConfirmModal
                isOpen={!!confirmId}
                message="Are you sure you want to delete this saved date?"
                onConfirm={confirmDelete}
                onCancel={() => setConfirmId(null)}
            />

            <EditNoteModal
                item={editingItem}
                onClose={() => setEditingItem(null)}
                onSave={handleEditNote}
            />
        </>
    )
}

export default SaveDates