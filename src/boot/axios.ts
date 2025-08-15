import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance } from 'axios';
import { type InjectionKey } from 'vue';
import { Cookies } from 'quasar';
import { QSsrContext } from '#q-app';
import { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
//import { parse, serialize, parseSetCookie, splitSetCookieString } from 'cookie-es';
import { type CookieOptions } from 'express';
import { parse } from 'set-cookie-parser';

export const apiKey: InjectionKey<AxiosInstance> = Symbol('api');

function setBECookiesToResponse(ssrContext: QSsrContext | null, apiResponse: AxiosResponse) {
  if (!process.env.SERVER) {
    return;
  }

  if (!ssrContext) {
    return;
  }
  if (!apiResponse.headers['set-cookie']) {
    return;
  }

  const parsedCookies = parse(apiResponse);
  if (!Array.isArray(parsedCookies) || parsedCookies.length === 0) {
    return;
  }

  parsedCookies.forEach((cookie) => {
    const cookieName = cookie.name;
    const cookieValue = cookie.value;
    const preparedCookie = Object.assign({}, cookie);
    delete preparedCookie.name;
    delete preparedCookie.value;
    ssrContext.res.cookie(cookieName, cookieValue, preparedCookie);
  });
}

function proxyFECookiesToBERequest(
  ssrContext: QSsrContext | null,
  apiRequestConfig: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
  if (!ssrContext) {
    return apiRequestConfig;
  }
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;

  // For example, attach an auth token from cookies
  const sessionCookieName = process.env.BE_SESSION_COOKIE;
  const csrfToken = cookies.get('XSRF-TOKEN');
  const session = cookies.get(sessionCookieName);
  if (csrfToken) {
    apiRequestConfig.headers['X-XSRF-TOKEN'] = csrfToken;
  }
  if (session) {
    apiRequestConfig.headers[`${sessionCookieName}`] = session;
  }

  return apiRequestConfig;
}

export default defineBoot(({ app, ssrContext }) => {
  const api = axios.create({
    baseURL: process.env.API_BASE_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // proxy FE cookies to BE
  api.interceptors.request.use(
    (config) => {
      if (process.env.SERVER && ssrContext) {
        console.log('proxyFECookiesToBERequest');
        const newConfig = proxyFECookiesToBERequest(ssrContext, config);
        console.log(newConfig);
        return newConfig;
      }
    },
    (error) => Promise.reject(error),
  );

  // proxy BE cookies to FE
  api.interceptors.response.use(
    (response) => {
      if (process.env.SERVER && ssrContext && response.headers['set-cookie']) {
        console.log('proxyBECookiesToFERequest');
        setBECookiesToResponse(ssrContext, response);
      }
      return response;
    },
    (error) => Promise.reject(error),
  );

  // log errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('api error in interceptor', error);
      return Promise.reject(error);
    },
  );

  // api.interceptors.response.use(undefined, async (error) => {
  //   if (error.response?.status === 419) {
  //     console.log('refresh token');
  //     throw error;
  //     //await refreshToken();
  //     //return api(error.config); // Retry original request
  //   }
  //
  //   throw error;
  // });

  app.provide(apiKey, api);
});
