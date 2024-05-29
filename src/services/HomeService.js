import {IBasketItemPrice, IBasketItems, IOrder} from '../interfaces'
import {axiosWithAuth} from "./interceptors";

class HomeService {
  async getAllProducts(category) {
    const {data} =
      await axiosWithAuth.get(`/product/getAll?categoryId=${category}`)
    return data
  }

  async getBasket() {
    const {data} =
      await axiosWithAuth.get(`/product/getBasket`)
    return data
  }

  async getOrders() {
    const {data} =
      await axiosWithAuth.get(`/product/getOrders`)
    return data
  }

  async getOrderList(id) {
    const {data} =
      await axiosWithAuth.get(`/product/getOrderList/${id}`)
    return data
  }

  async copyOrder(list) {
    const {data} =
      await axiosWithAuth.post(`/product/copyOrder`, {list})
    return data
  }

  async addInBasket(productVendorCode, count) {
    const item = IBasketItems(productVendorCode, count)
    const {data} = await axiosWithAuth.post(`/product/addInBasket`, item)
    return data
  }

  async deleteInBasket(productVendorCode) {
    const {data} = await axiosWithAuth.delete(`/product/deleteInBasket`, {data: {productVendorCode}})
    return data
  }

  async deleteAllInBasket() {
    const {data} = await axiosWithAuth.delete(`/product/deleteAllInBasket`)
    return data
  }


  async updateCount(vendor_code, count) {
    const item = IBasketItems(vendor_code, count)
    const {data} = await axiosWithAuth.put(`/product/updateCountBasket`, item)
    return data
  }

  async updatePrice(vendor_code, price) {
    const item = IBasketItemPrice(vendor_code, price)
    const {data} = await axiosWithAuth.put(`/product/updatePriceBasketItem`, item)
    return data
  }

  async takeOrder(order, formOrg, nameOrg, generalCount) {
    const item = IOrder(order, formOrg, nameOrg, generalCount)
    console.log(item)
    const {data} = await axiosWithAuth.post(`/product/sendExcel`, {order: item})
    return data
    /*const item = IOrder(order, formOrg, nameOrg)
    console.log(item)
    const {data} = await axios.post(`http://192.168.1.121:5000/api/product/sendExcel`, {order})
    return data*/
  }

  async getUser() {
    const {data} = await axiosWithAuth.get(`/user/getUser`)
    return data
  }

}

export default new HomeService()