import axios from "axios";
import { endPoint , host} from "./constants";

const baseApi: string = "api/v1/auth";

class AuthAPI {
  async login(email: string, password: string) {
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
  async refreshToken(refresh_token: string) {
    return await axios.post(`http://localhost:9000/user/refresh-token`, {
      refresh_token,
    });
  }
}

export default new AuthAPI();
