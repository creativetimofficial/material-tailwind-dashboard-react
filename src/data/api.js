import axios from "axios"

const API_BASE_URL = "http://127.0.0.1:8000/api/"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const Service = {
  get: async (url) => {
    try {
      const response = await api.get(url)
      return response.data
    } catch (error) {
      console.error("Error en GET:", error)
      throw error
    }
  },

  post: async (url, data) => {
    try {
      const response = await api.post(url, data)
      return response.data
    } catch (error) {
      console.error("Error en POST:", error)
      throw error
    }
  },

  patch: async (url, data) => {
    try {
      const response = await api.patch(url, data)
      return response.data
    } catch (error) {
      console.error("Error en PATCH:", error)
      throw error
    }
  },

  put: async (url, data) => {
    try {
      const response = await api.put(url, data)
      return response.data
    } catch (error) {
      console.error("Error en PUT:", error)
      throw error
    }
  },

  delete: async (url) => {
    try {
      const response = await api.delete(url)
      return response.data
    } catch (error) {
      console.error("Error en DELETE:", error)
      throw error
    }
  },
}

