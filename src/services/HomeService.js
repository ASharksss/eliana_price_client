import axios from "axios";
import {IBasketItemPrice, IBasketItems, IOrder} from '../interfaces'

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

  async getOrders() {
    const {data} =
      await axios.get(`http://192.168.1.121:5000/api/product/getOrders`)
    return data
  }

  async getOrderList(id) {
    const {data} =
      await axios.get(`http://192.168.1.121:5000/api/product/getOrderList/${id}`)
    return data
  }

  async addInBasket(productVendorCode, count) {
    const item = IBasketItems(productVendorCode, count)
    const {data} = await axios.post(`http://192.168.1.121:5000/api/product/addInBasket`, item)
    return data
  }

  async deleteInBasket(productVendorCode) {
    const {data} = await axios.delete(`http://192.168.1.121:5000/api/product/deleteInBasket`, {data: {productVendorCode}})
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

  async takeOrder(order, formOrg, nameOrg, generalCount) {
    const item = IOrder(order, formOrg, nameOrg, generalCount)
    console.log(item)
    const {data} = await axios.post(`http://192.168.1.121:5000/api/product/sendExcel`, {order: item})
    return data
    /*const item = IOrder(order, formOrg, nameOrg)
    console.log(item)
    const {data} = await axios.post(`http://192.168.1.121:5000/api/product/sendExcel`, {order})
    return data*/
  }

}

export default new HomeService()