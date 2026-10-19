import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../features/auth/authSlice"
import { useState } from "react"
import ConfirmModal from "./ConfirmModal"

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark glass-navbar">
                <div className="container">
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
                                <Link className="nav-link" to="/saved-dates">Saved Dates</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center gap-1">
                            <Link to="/profile" className="avatar-btn" title="Go to profile">
                                {user?.fullname?.charAt(0).toUpperCase()}
                            </Link>
                            <span className="text-white small d-none d-md-inline">{user?.fullname}</span>

                            <button
                                className="btn btn-outline-light btn-sm"
                                onClick={() => setShowLogoutConfirm(true)}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <ConfirmModal isOpen={showLogoutConfirm}
                message="Are you sure you want to logout"
                onConfirm={() => {
                    setShowLogoutConfirm(false)
                    handleLogout()
                }}
                onCancel={() => setShowLogoutConfirm(false)}
                confirmLabel="Logout"
            />
        </>
    )

}


export default Navbar