import {IUserLogin} from "../interfaces";
import {axiosClassic, axiosWithAuth} from "./interceptors";
import {saveTokenStorage, removeFromStorage} from "./AuthService";

class UserService {
  async login(email, password) {
    try {
      const user = IUserLogin(email, password)
      const {data} = await axiosClassic.post(`/user/login`, user)
      axiosWithAuth.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      return data
    } catch (e) {
      return e
    }
  }

  async createNewUser(user) {
    try {
      const {data} = await axiosClassic.post(`/user/create`, user)
      return data
    } catch (e) {
      throw Error(e)
    }
  }

  async getNewTokens() {
    const response = await axiosClassic.post('/user/login/access-token')
    // const response = await axiosClassic("/user/login/access-token", {
    //   method: "post",
    //   withCredentials: true
    // })
    if (response.data.token) {
      axiosWithAuth.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      saveTokenStorage(response.data.token)
    }
    return response
  }

  async logout() {
    const response = await axiosClassic.post('/user/logout')
    if (response.data)
      removeFromStorage();
    return response;
  }
}

export default new UserService()