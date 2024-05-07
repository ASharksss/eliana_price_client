import axios from "axios";
import {IBasketItems} from '../interfaces'

class HomeService {
  async getAllProducts(category) {
    const {data} =
      await axios.get(`http://192.168.1.121:5000/api/product/getAll?categoryId=${category}`)
    return data
  }

  async getBasket() {
    const {data} =
      await axios.get(`http://192.168.1.121:5000/api/product/getBasket`)
    return data
  }

  async addInBasket(productVendorCode, count) {
    const item = IBasketItems(productVendorCode, count)
    const {data} = await axios.post(`http://192.168.1.121:5000/api/product/addInBasket`, item)
    return data
  }

  async updateCount(vendor_code, count) {
    const item = IBasketItems(vendor_code, count)
    const {data} = await axios.put(`http://192.168.1.121:5000/api/product/updateCountBasket`, item)
    return data
  }

}

export default new HomeService()