import { Routes, Route, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import AppLayout from "./components/AppLayout"
import Onboarding from "./pages/Onboarding"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"

function App() {
    const { user } = useSelector((state) => state.auth)
    const location = useLocation()

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
                <Route path="*" element={<Dashboard />} />
            </Routes>
        </AppLayout>
    )
}

export default App