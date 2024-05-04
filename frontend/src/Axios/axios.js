import axios from "axios"
const instance = axios.create({
    baseURL:"https://todos-tath.onrender.com/api"
})
export default instance
