import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import AppLayout from "./components/AppLayout"
import Onboarding from "./pages/Onboarding"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import { restoreAuthThunk } from "./features/auth/authThunks"
import { setLoading } from "./features/auth/authSlice"
import SaveDates from "./pages/SaveDates"

function App() {
    const dispatch = useDispatch()
    const { user, loading } = useSelector((state) => state.auth)
    const location = useLocation()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token && !user) {
            dispatch(restoreAuthThunk())
        } else {
            dispatch(setLoading(false))
        }
    }, [])

    if (loading) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="spinner-border text-light" role="status"></div>
            </div>
        )
    }

    const authRoutes = ["/", "/login", "/register"]
    const isAuthPage = authRoutes.includes(location.pathname)

    if (isAuthPage || !user) {
        return (
            <Routes>
                <Route path="/" element={<Onboarding />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Onboarding />} />
            </Routes>
        )
    }

    return (
        <AppLayout>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/saved-dates" element={<SaveDates />} />
                <Route path="*" element={<Dashboard />} />
            </Routes>
        </AppLayout>
    )
}

export default App