import axios from "axios";

const BASE_URL = "http://localhost:4000";
const PATH = "users";

export class UserService {
  static getUsers() {
    return axios.get(`${BASE_URL}/${PATH}`);
  }
  static getUser(id) {
    return axios.get(`${BASE_URL}/${PATH}/${id}`);
  }
  static createUser(body) {
    return axios.post(`${BASE_URL}/${PATH}`, body);
  }
  static updateUser(id, body) {
    return axios.put(`${BASE_URL}/${PATH}/${id}`, body);
  }
  static deleteUser(id) {
    return axios.get(`${BASE_URL}/${PATH}/${id}`);
  }
}
