import axios from "axios";
import {IBasketItemPrice, IBasketItems} from '../interfaces'

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

  async updatePrice(vendor_code, price) {
    const item = IBasketItemPrice(vendor_code, price)
    const {data} = await axios.put(`http://192.168.1.121:5000/api/product/updatePriceBasketItem`, item)
    return data
  }

  async takeOrder(order) {
    const {data} = await axios.post(`http://192.168.1.121:5000/api/product/sendExcel`, order)
    return data
  }

}

export default new HomeService()