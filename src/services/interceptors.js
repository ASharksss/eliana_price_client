import axios from "axios" ;
import {getAccessToken, removeFromStorage} from "./AuthService";
import userService from "./UserService";

const options = {
  baseURL: 'http://192.168.1.121:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
  const accessToken = getAccessToken()
  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

function errorCatch(error) {
  return error.toString()
}

axiosWithAuth.interceptors.response.use(config => config, async error => {
  const originalRequest = error.config;
  if((error?.response?.status === 401 || errorCatch(error) === 'jwt expired' || errorCatch(error) === 'jwt must be provided') && error.config && !error.config._isRetry){
    originalRequest._isRetry = true
    try {
      await userService.getNewTokens()
      return axiosWithAuth.request(originalRequest)
    }
    catch (error) {
      if (errorCatch(error) === 'jwt expired') removeFromStorage();
    }
  }
  throw error
})

export {axiosClassic, axiosWithAuth}
