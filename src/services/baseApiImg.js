import axios from 'axios'

const apiImg = axios.create({
  baseURL: 'http://localhost:8888',
  headers: {
    'accept ': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
    'Content-Type': 'multipart/form-data',
  },
})

apiImg.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      const parsedToken = JSON.parse(token)
      config.headers['Authorization'] = `Bearer ${parsedToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiImg
