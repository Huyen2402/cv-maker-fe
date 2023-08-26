import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { endPoint } from './constants';
import { setLocalItem } from '../common/utils';

class ApiClient {
  private axiosInstance = axios.create({
    baseURL: endPoint,
  });

  constructor() {
    this.setupInterceptors();
  }

  private async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return;
    }

    try {
      const response = await this.axiosInstance.post(`/user/refresh-token`, { refreshToken });
      setLocalItem('accessToken', response.data.accessToken);
      setLocalItem('refreshToken', response.data.refreshToken);

      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
    } catch (error) {
      console.error(error);
    }
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: any) => {
        if (error.response && error.response.status === 401) {
          await this.refreshToken();
          return this.axiosInstance.request(error.config);
        }else {
          // eslint-disable-next-line no-restricted-globals
          location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ApiClient();
