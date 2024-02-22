import axios from "axios";

const BASE_URL = "http://localhost:4000";
const PATH = "products";

export class ProductService {
  static getProducts() {
    return axios.get(`${BASE_URL}/${PATH}`);
  }
  static getProductsWithDiscount() {
    return axios.get(`${BASE_URL}/${PATH}/discount`);
  }
  static getProductsByCategory(params) {
    return axios.get(`${BASE_URL}/${PATH}/bycategory/${params}`);
  }
  static getProduct(id) {
    return axios.get(`${BASE_URL}/${PATH}/${id}`);
  }
  static createProduct(body) {
    return axios.post(`${BASE_URL}/${PATH}`, body);
  }
  static updateProduct(id, body) {
    return axios.put(`${BASE_URL}/${PATH}/${id}`, body);
  }
  static deleteProduct(id) {
    return axios.get(`${BASE_URL}/${PATH}/${id}`);
  }
}
