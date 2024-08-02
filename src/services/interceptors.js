import axios from "axios" ;
import {getAccessToken, removeFromStorage} from "./AuthService";
import userService from "./UserService";

const options = {
  // baseURL: 'https://backend.eliana.pro/api',
  baseURL: 'http://192.168.1.121:5001/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
  const accessToken = getAccessToken() || localStorage.getItem('token')
  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

const errorCatch = (error) => {
  const message = error?.response?.data?.message
  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message
}

axiosWithAuth.interceptors.response.use(config => config, async error => {
  const originalRequest = error.config;
  console.log(errorCatch(error))
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
