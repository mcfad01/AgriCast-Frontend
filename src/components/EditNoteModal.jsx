import { useState, useEffect } from "react"
import { X } from "lucide-react"

function EditNoteModal({ item, onClose, onSave }) {
    const [note, setNote] = useState("")
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        setNote(item?.note || "")
        setError("")
    }, [item])

    if (!item) return null

    const handleSave = async () => {
        setSaving(true)
        setError("")

        try {
            await onSave(item._id, note)
            onClose()
        } catch (err) {
            const msg = err?.response?.data?.message || "Could not update note. Please try again."
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
                    <h5 className="mb-0">Edit Note</h5>
                    <button
                        type="button"
                        className="btn-glass"
                        onClick={onClose}
                        style={{ padding: "4px 8px" }}
                    >
                        <X size={16} />
                    </button>
                </div>

                <p className="small mb-3" style={{ opacity: 0.75 }}>
                    {new Date(item.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                    })}
                </p>

                {error && <div className="alert alert-danger">{error}</div>}

                <label className="form-label">Note</label>
                <textarea
                    className="form-control auth-input mb-3"
                    rows="4"
                    placeholder="Update your note..."
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
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditNoteModal