import axios from "axios";

class HomeService {
  async getAllProducts(category) {
    const {data} = await axios.get(`http://localhost:5000/api/product/getAll?categoryId=${category}`)
    return data
  }



}

export default new HomeService()