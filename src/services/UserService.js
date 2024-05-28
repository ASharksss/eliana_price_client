import axios from "axios";
import {IUserLogin} from "../interfaces";
import {backendUrl} from "../utils";
import {axiosClassic} from "./interceptors";
import {saveTokenStorage} from "./AuthService";

class UserService {
  async login(email, password) {
    try {
      const user = IUserLogin(email, password)
      const {data} = await axios.post(`${backendUrl}/user/login`, user)
      return data
    } catch (e) {
      return e
    }
  }
  async getNewTokens() {
    const response = await axiosClassic.post('/user/login/access-token')
    if (response.data.token)
      saveTokenStorage(response.data.token)
    return response
  }
}

export default new UserService()