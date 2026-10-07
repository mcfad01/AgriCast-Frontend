import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function Dashboard() {
    const { user } = useSelector((state) => state.auth)

    return (
        <>
            <div className="glass-panel mb-4">
                <h1 className="mb-1">Hello, {user?.fullname}</h1>
                <p className="mb-0">{user?.email}</p>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="glass-panel h-100">
                        <h5 className="mb-3">📍 Farm Location</h5>
                        {user?.farmLocation?.name ? (
                            <>
                                <p className="mb-1"><strong>{user.farmLocation.name}</strong></p>
                                <p className="small mb-0">
                                    Lat: {user.farmLocation.latitude}, Lng: {user.farmLocation.longitude}
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

                <div className="col-md-6 mb-4">
                    <div className="glass-panel h-100">
                        <h5 className="mb-3">📅 Saved Dates</h5>
                        <p>Coming soon...</p>
                        <Link to="/saved-dates" className="btn-glass-green d-inline-block mt-3">
                            View All
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard