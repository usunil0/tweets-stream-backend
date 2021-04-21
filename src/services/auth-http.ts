import { HttpService } from "./http";
const config = require("dotenv").config();

export abstract class TokenHttpService extends HttpService {
 protected abstract getTokenHeader: () => Promise<any>;

 private async getModifiedConfig(config?: any): Promise<any> {
  if (!config) {
   config = { headers: {} };
  }

  let { headers } = config;
  const tokenHeader = await this.getTokenHeader();
  return { ...config, headers: { ...headers, ...tokenHeader } };
 }

 protected async get<T = any>(
  uri: string,
  config?: any | undefined
 ): Promise<T> {
  const newConfig = await this.getModifiedConfig(config);
  return super.get(uri, newConfig);
 }

 protected async post<T = any>(
  uri: string,
  data: any,
  config?: any | undefined
 ): Promise<T> {
  const newConfig = await this.getModifiedConfig(config);
  return super.post(uri, data, newConfig);
 }

 protected async patch<T = any>(
  uri: string,
  data: any,
  config?: any | undefined
 ): Promise<T> {
  const newConfig = await this.getModifiedConfig(config);
  return super.patch(uri, data, newConfig);
 }

 protected async put<T = any>(
  uri: string,
  data: any,
  config?: any | undefined
 ): Promise<T> {
  const newConfig = await this.getModifiedConfig(config);
  return super.put(uri, data, newConfig);
 }

 protected async delete<T = any>(
  uri: string,
  config?: any | undefined
 ): Promise<T> {
  const newConfig = await this.getModifiedConfig(config);
  return super.delete(uri, newConfig);
 }

 protected getUrlEscapedParams(params?: any) {
  if (!params) {
   return params;
  }

  const urlEscapedParams: any = {};

  for (const key in params) {
   let value = params[key];

   if (typeof value === "object") {
    value = value.join(",");
   }

   urlEscapedParams[key] = value;
  }

  return urlEscapedParams;
 }
}

export class AuthorizedHttpService extends TokenHttpService {
 getTokenHeader = async () => {
  return {
   Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
  };
 };
}
