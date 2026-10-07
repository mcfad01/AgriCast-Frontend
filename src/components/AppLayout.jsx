import Navbar from "./Navbar"
import "../styles/auth.css"

function AppLayout({ children }) {
    return (
        <div className="app-bg">
            <div className="app-overlay"></div>
            <Navbar />
            <div className="app-content">
                <div className="container">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AppLayout