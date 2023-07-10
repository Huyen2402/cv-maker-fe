import jwt_decode from 'jwt-decode';

class AuthService {
  async getToken() {
    const token = localStorage.getItem("token") ?? "";
    return token === "" ? null : token;
  }

  async setToken(token: string) {
    localStorage.setItem("token", token);
  }

  async getUserInfo(){
    const token: any = await this.getToken();
    const decoded: any = token ? jwt_decode(token) : undefined;
    return decoded;
  }
}

export default new AuthService();
