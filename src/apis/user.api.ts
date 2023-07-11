import axios from "axios";
import { endPoint } from "./constants";

const baseApi: string = "user";

class AuthAPI {
  async login(email: string, password: string) {
    console.log(email);
    return await axios.post(`${endPoint}/${baseApi}/login`, {
      email,
      password,
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthAPI();
