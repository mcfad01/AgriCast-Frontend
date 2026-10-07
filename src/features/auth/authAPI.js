import api from "../../api/axios"

export const loginUser = async (email, password) =>{
    const response = await api.post("/login", { email, password })
    return response.data

}

export const registerUser = async (fullname, email, password) =>{
    const response = await api.post("/register", { fullname, email, password })
    return response.data
    
}

export const fetchProfile = async () =>{
    const response = await api.get("/profile")
    return response.data
}