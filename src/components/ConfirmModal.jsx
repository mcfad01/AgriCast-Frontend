function ConfirmModal({ isOpen, message, onConfirm, onCancel, confirmLabel = "Delete" }) {
    if (!isOpen) return null

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0, 0, 0, 0.65)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                padding: "24px"
            }}
            onClick={onCancel}
        >
            <div
                className="glass-panel"
                style={{ maxWidth: "400px", width: "100%" }}
                onClick={(e) => e.stopPropagation()}
            >
                <h5 className="mb-3">Confirm</h5>
                <p style={{ opacity: 0.80 }}>{message}</p>

                <div className="d-flex gap-2 justify-content-end ">
                    <button type="button" className="btn-glass" onClick={onCancel}>
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn-glass-green"
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal