import api from "./axios"

export const getSavedDates = async () => {
    const response = await api.get("/saved-dates")
    return response.data
}

export const createSavedDate = async (data) => {
    const response = await api.post("/saved-dates", data)
    return response.data
}

export const deleteSavedDate = async (id) => {
    const response = await api.delete(`/saved-dates/${id}`)
    return response.data
}

export const updateSavedDate = async (id, note) => {
    const response = await api.patch(`/saved-dates/${id}`, { note })
    return response.data
}