import { Link } from "react-router-dom"
import "../styles/auth.css"

function Onboarding() {
    return (
        <div className="onboarding-container">
            <div className="onboarding-overlay"></div>

            <div className="onboarding-content ">
                <h1 className="onboarding-brand">Plan Smarter,
                    Farm with Confidence.</h1>
                <p className="onboarding-tagline">
                    Real time weather forecasts to help you plan your farming activities, track changing conditions, and make better decisions throughout the season
                </p>

                <div className="onboarding-buttons">
                    <Link to="/register" className="btn-onboarding-primary">
                        Get Started
                    </Link>
                    <Link to="/login" className="btn-onboarding-secondary">
                        Sign In
                    </Link>
                </div>

                <p className="onboarding-tagline fst-italic">
                    Real-time forecasts  •  Weather tracking  •  Farm planning
                </p>
            </div>
        </div>
    )
}

export default Onboarding