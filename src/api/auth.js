import axios from "axios";

const BASE_URL = "http://localhost:4000";
const PATH = "auth";

export class AuthService {
  static login(body) {
    return axios.post(`${BASE_URL}/${PATH}/login`, body);
  }
  static register(body) {
    return axios.post(`${BASE_URL}/${PATH}/register`, body);
  }
}
