/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, AxiosError } from 'axios';
import { ApiError } from './ApiError';
import endpoint from './endpoint.config';

export function requestLogin(email: string, password: string): Promise<any> {
  const data = {
    email,
    password,
  };

  return new Promise((resolve, reject) => {
    axios
      .post(endpoint.auth.login(), data, { withCredentials: true })
      .then((resp: AxiosResponse) => resolve(resp.data))
      .catch((err: AxiosError) => reject(new ApiError(err)));
  });
}

export function me(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint.auth.me(), { withCredentials: true })
      .then((resp: AxiosResponse) => resolve(resp.data))
      .catch((err: AxiosError) => reject(new ApiError(err)));
  });
}
