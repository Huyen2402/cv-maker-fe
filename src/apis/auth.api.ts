import axios from "axios";
import { endPoint, host } from "./constants";

const baseApi: string = "api/v1/auth";

class AuthAPI {
  async login(email: string, password: string) {
    console.log(email);
    return await axios.post(`${endPoint}/${baseApi}/login`, {
      email,
      password,
    });
  }
  async CallAPILogin(body: any) {
    console.log('body', body);
    return await axios.post(host, {
      email: body.email,
      password: body.pass
    });
  }
}

export default new AuthAPI();
