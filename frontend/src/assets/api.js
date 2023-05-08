
import axios from "axios"

const api = axios.create({
    baseURL: "https://ayshadashboard.com/api"
})

export default api