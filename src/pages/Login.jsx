import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { loginThunk } from "../features/auth/authThunks"
import "../styles/auth.css"
import { useState } from "react"

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading } = useSelector((state) => state.auth)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            password: Yup.string()
                .min(10, "Password must be at least 10 characters")
                .required("Password is required")
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                await dispatch(loginThunk(values)).unwrap()
                navigate("/dashboard")
            } catch (error) {
                setErrors({
                    general: error?.response?.data?.message || error.message || "Login failed. Please try again."
                })
            } finally {
                setSubmitting(false)
            }
        }
    })

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="auth-container">
            <div className="auth-image">
                <div className="auth-image-overlay">
                    <h3>Your farm. Your forecast. Your plan.</h3>
                    <p>Get the weather information you need to make better farming decisions.</p>
                </div>
            </div>

            <div className="auth-form-side">
                <div className="auth-form-wrapper">
                    <img src="/myLogo.svg" className="navbar-logo"/>
                    <h2 className="auth-title">Welcome back to AgriCast</h2>
                    <p className="auth-subtitle">Check the weather and plan your farm with confidence.</p>

                    <div className="auth-switch">
                        <Link to="/login" className="auth-switch-btn active">Login</Link>
                        <Link to="/register" className="auth-switch-btn">Sign Up</Link>
                    </div>

                    {formik.errors.general && (
                        <div className="alert alert-danger">{formik.errors.general}</div>
                    )}

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control auth-input"
                                placeholder="Enter your email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <small className="text-danger">{formik.errors.email}</small>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="form-control auth-input"
                                    placeholder="Enter your password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <small className="text-danger">{formik.errors.password}</small>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="auth-btn"
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? "Log in..." : "Login"}
                        </button>
                    </form>

                    <p className="auth-footer">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login