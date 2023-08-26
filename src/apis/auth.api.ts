import apiClient from "./base.api";

const path: string = "user";

class AuthAPI {
  async login(email: string, password: string) {
    return await apiClient.post(`${path}/login`, {
      email,
      password,
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthAPI();
