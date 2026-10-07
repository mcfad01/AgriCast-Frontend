import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { registerThunk } from "../features/auth/authThunks"
import "../styles/auth.css"
import { useState } from "react"


function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            fullname: Yup.string()
                .min(3, "Name must be at least 3 characters")
                .required("Full name is required"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            password: Yup.string()
                .min(10, "Password must be at least 10 characters")
                .required("Password is required")
        }),
        onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
            try {
                await dispatch(registerThunk(values)).unwrap()
                resetForm()
                navigate("/login")
            } catch (error) {
                setErrors({
                    general: error?.response?.data?.message || error.message || "Registration failed. Please try again."
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
                    <h3>Join farmers making smarter decisions.</h3>
                    <p>Track weather, save favorable dates, and plan your farming activities with confidence.</p>
                </div>
            </div>

            <div className="auth-form-side">
                <div className="auth-form-wrapper">
                    <h2 className="auth-title">Create your AgriCast account</h2>
                    <p className="auth-subtitle">Plan smarter with weather insights built for your farm.</p>

                    <div className="auth-switch">
                        <Link to="/login" className="auth-switch-btn">Login</Link>
                        <Link to="/register" className="auth-switch-btn active">Sign Up</Link>
                    </div>

                    {formik.errors.general && (
                        <div className="alert alert-danger">{formik.errors.general}</div>
                    )}

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Full name</label>
                            <input
                                type="text"
                                name="fullname"
                                className="form-control auth-input"
                                placeholder="Enter your full name"
                                value={formik.values.fullname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.fullname && formik.errors.fullname && (
                                <small className="text-danger">{formik.errors.fullname}</small>
                            )}
                        </div>

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
                            {formik.isSubmitting ? "Creating account..." : "Create an account"}
                        </button>
                    </form>

                    <p className="auth-footer">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>

                    <p className="auth-footer">
                        By continuing, you agree to AgriCast's Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register