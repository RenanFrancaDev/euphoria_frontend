import axios from "axios";

const BASE_URL = "http://localhost:4000";
const PATH = "categories";

export class CategoryService {
  static getCategories() {
    return axios.get(`${BASE_URL}/${PATH}`);
  }
  static getCategory(id) {
    return axios.get(`${BASE_URL}/${PATH}/${id}`);
  }
  static createCategory(body) {
    return axios.post(`${BASE_URL}/${PATH}`, body);
  }
  static updateCategory(id, body) {
    return axios.put(`${BASE_URL}/${PATH}/${id}`, body);
  }
  static deleteCategory(id) {
    return axios.get(`${BASE_URL}/${PATH}/${id}`);
  }
}
