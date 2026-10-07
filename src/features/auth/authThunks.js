import { createAsyncThunk } from "@reduxjs/toolkit"
import { loginUser, registerUser, fetchProfile } from "./authAPI"
import { setUser, setToken, setLoading } from "./authSlice"

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