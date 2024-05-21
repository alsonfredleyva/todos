import axios from "axios"
const instance = axios.create({
    baseURL:"https://todos-production-e6fd.up.railway.app/api"
})
export default instance
