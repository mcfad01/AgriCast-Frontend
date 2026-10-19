import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import * as Yup from "yup"
import { User, MapPin, Crosshair } from "lucide-react"
import { reverseGeocode } from "../api/weather"
import { updateLocationThunk } from "../features/auth/authThunks"
import { useNavigate } from "react-router-dom"

function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    const [successMessage, setSuccessMessage] = useState("")
    const [locationError, setLocationError] = useState("")

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            city: user?.farmLocation?.city || "",
            latitude: user?.farmLocation?.latitude || "",
            longitude: user?.farmLocation?.longitude || ""
        },
        validationSchema: Yup.object({
            city: Yup.string()
                .min(2, "Name must be at least 2 characters")
                .required("Location name is required"),
            latitude: Yup.number()
                .typeError("Latitude must be a number")
                .min(-90, "Latitude must be between -90 and 90")
                .max(90, "Latitude must be between -90 and 90")
                .required("Latitude is required"),
            longitude: Yup.number()
                .typeError("Longitude must be a number")
                .min(-180, "Longitude must be between -180 and 180")
                .max(180, "Longitude must be between -180 and 180")
                .required("Longitude is required")
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                setSuccessMessage("")
                await dispatch(updateLocationThunk(values)).unwrap()
                setSuccessMessage("Farm location updated successfully!")
                setTimeout(() => navigate("/dashboard"), 1200)
            } catch (error) {
                setErrors({
                    general: error?.response?.data?.message || "Could not update location."
                })
            } finally {
                setSubmitting(false)
            }
        }
    })

    const handleUseMyLocation = () => {
        setLocationError("")

        if (!navigator.geolocation) {
            setLocationError("Your browser does not support geolocation.")
            return
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude
                const lon = position.coords.longitude

                formik.setFieldValue("latitude", lat.toFixed(6))
                formik.setFieldValue("longitude", lon.toFixed(6))

                try {
                    const places = await reverseGeocode(lat, lon)

                    if (places && places.length > 0) {
                        const place = places[0]
                        const cityName = place.state
                            ? `${place.name}, ${place.state}`
                            : place.name

                        formik.setFieldValue("city", cityName)
                    }
                } catch (err) {
                    console.log("Reverse geocode failed:", err)
                }
            },
            (error) => {
                console.log(error)
                setLocationError("Could not get your location. Please enter coordinates manually.")
            }
        )
    }

    return (
        <>
            <div className="glass-panel mb-4">
                <div className="d-flex align-items-center gap-3">
                    <div className="icon-badge">
                        <User size={28} strokeWidth={2} />
                    </div>
                    <div>
                        <h4 className="mb-1">{user?.fullname}</h4>
                        <p className="mb-0" style={{ opacity: 0.85 }}>{user?.email}</p>
                    </div>
                </div>
            </div>

            <div className="glass-panel mb-4">
                <h5 className="mb-3 d-flex align-items-center gap-2">
                    <MapPin size={20} /> Farm Location
                </h5>

                {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                )}

                {formik.errors.general && (
                    <div className="alert alert-danger">{formik.errors.general}</div>
                )}

                {locationError && (
                    <div className="alert alert-warning">{locationError}</div>
                )}

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Location Name</label>
                        <input
                            type="text"
                            name="city"
                            className="form-control auth-input"
                            placeholder="e.g., Ibadan, Oyo State"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.city && formik.errors.city && (
                            <small className="text-danger">{formik.errors.city}</small>
                        )}
                    </div>

                    <button
                        type="button"
                        className="btn-glass-green mb-3 d-flex align-items-center gap-2"
                        onClick={handleUseMyLocation}
                    >
                        <Crosshair size={16} /> Use My Current Location
                    </button>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Latitude</label>
                            <input
                                type="text"
                                name="latitude"
                                className="form-control auth-input"
                                placeholder="e.g., 7.3775"
                                value={formik.values.latitude}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.latitude && formik.errors.latitude && (
                                <small className="text-danger">{formik.errors.latitude}</small>
                            )}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Longitude</label>
                            <input
                                type="text"
                                name="longitude"
                                className="form-control auth-input"
                                placeholder="e.g., 3.9470"
                                value={formik.values.longitude}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.longitude && formik.errors.longitude && (
                                <small className="text-danger">{formik.errors.longitude}</small>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-glass-green mt-2"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Saving..." : "Save Farm Location"}
                    </button>

                    <button
                        type="button"
                        className="btn-glass ms-2 mt-2"
                        onClick={() => navigate("/dashboard")}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </>
    )
}

export default Profile