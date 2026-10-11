import { createAsyncThunk } from "@reduxjs/toolkit"
import { loginUser, registerUser, fetchProfile } from "./authAPI"
import { setUser, setToken, setLoading } from "./authSlice"
import api from "../../api/axios"

export const loginThunk = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { dispatch }) => {
        try {
            dispatch(setLoading(true))

            const response = await loginUser(email, password)
            const token = response.data.token

            localStorage.setItem("token", token)
            dispatch(setToken(token))

            const profileResponse = await fetchProfile()
            dispatch(setUser(profileResponse.data))

            return response
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            dispatch(setLoading(false))
        }
    }
)

export const registerThunk = createAsyncThunk(
    "auth/register",
    async ({ fullname, email, password }) => {
        try {
            const response = await registerUser(fullname, email, password)
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)
export const updateLocationThunk = createAsyncThunk(
    "auth/updateLocation",
    async ({ name, latitude, longitude }, { dispatch }) => {
        try {
            await api.put("/location", { name, latitude, longitude })
            const profileResponse = await api.get("/profile")
            dispatch(setUser(profileResponse.data.data))
            return profileResponse.data.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)

export const restoreAuthThunk = createAsyncThunk(
    "auth/restore",
    async (_, { dispatch }) => {
        try {
            const profileResponse = await fetchProfile()
            dispatch(setUser(profileResponse.data))
            return profileResponse.data
        } catch (error) {
            console.log("Auth restore failed:", error)
            localStorage.removeItem("token")
            dispatch(setToken(null))
            throw error
        } finally {
            dispatch(setLoading(false))
        }
    }
)