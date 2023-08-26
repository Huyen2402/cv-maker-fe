import jwt_decode from 'jwt-decode';

export function getToken() {
  const token = localStorage.getItem("token") ?? "";
  return token === "" ? null : token;
}

export function setLocalItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getUserInfo(){
  const token: any = getToken();
  const decoded: any = token ? jwt_decode(token) : undefined;
  return decoded;
}