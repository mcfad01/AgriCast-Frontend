import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../features/auth/authSlice"

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark glass-navbar">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/dashboard">
                    AgriCast
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navMenu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/forecast">Forecast</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/saved-dates">Saved Dates</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        <span className="text-white small">{user?.fullname}</span>
                        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar