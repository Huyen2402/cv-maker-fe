import axios from "axios";
import { endPoint , host} from "./constants";

const baseApi: string = "user";

class AuthAPI {
  async login(email: string, password: string) {
    console.log(email);
    return await axios.post(`${endPoint}/${baseApi}/login`, {
      email,
      password,
    });
  }

  async refreshToken(refresh_token: string) {
    return await axios.post(`http://localhost:9000/user/refresh-token`, {
      refresh_token,
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthAPI();
