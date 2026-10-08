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

                <div className="marquee">
                    <div className="marquee-track">
                        <div className="marquee-item">
                            Real-time forecasts&nbsp;&nbsp;•&nbsp;&nbsp;Weather tracking&nbsp;&nbsp;•&nbsp;&nbsp;Farm planning&nbsp;&nbsp;•&nbsp;&nbsp;
                        </div>
                        <div className="marquee-item" aria-hidden="true">
                            Real-time forecasts&nbsp;&nbsp;•&nbsp;&nbsp;Weather tracking&nbsp;&nbsp;•&nbsp;&nbsp;Farm planning&nbsp;&nbsp;•&nbsp;&nbsp;
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Onboarding