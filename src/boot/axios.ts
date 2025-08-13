import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance } from 'axios';
import { type InjectionKey } from 'vue';
import { Cookies } from 'quasar';

export const apiKey: InjectionKey<AxiosInstance> = Symbol('api');

export default defineBoot(({ app, ssrContext }) => {
  const api = axios.create({
    baseURL: 'http://localhost:8100',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
  console.log(cookies.getAll());

  console.log(ssrContext);
  api.interceptors.response.use(undefined, async (error) => {
    if (error.response?.status === 419) {
      console.log('refresh token');
      throw error;
      //await refreshToken();
      //return api(error.config); // Retry original request
    }

    throw error;
  });

  app.provide(apiKey, api);
});
