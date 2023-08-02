import axios from "axios";
import jwt from "jwt-decode";
import { endPoint, host } from "./constants";
import { setAccessToken } from "../common/utils";

const baseApi: string = "user";

class AuthAPI {
  async login(email: string, password: string) {
    return await axios.post(`${host}`, {
      email,
      password,
    });
  }

  async refreshToken(accessToken: string) {
    return await axios.post(`http://localhost:9000/user/refresh-token`, {
      accessToken,
    });
  }

  async common() {
    const res = await this.checkToken();
    if (!res) {
      const accessToken: any = localStorage.getItem("accessToken");
      try {
        const result = await this.refreshToken(accessToken);
        setAccessToken(result.data.accessToken);
      } catch (error) {
        // eslint-disable-next-line no-restricted-globals
        location.href = '/login';
      }
    }
    return await axios.get(`${endPoint}/${baseApi}/common`);
  }

  async checkToken() {
    const accessToken: any = localStorage.getItem("accessToken");
    const decode: any = jwt(accessToken);
    const dateRF = decode.exp * 1000;
    const start = Date.now();
    if (dateRF <= start) {
      try {
        return false;
        // eslint-disable-next-line no-unreachable
      } catch (error) {
        return false;
      }
    } else {
      return true;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthAPI();
