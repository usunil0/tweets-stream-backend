import needle from "needle";
import { TWITTER_API_BASE_URL } from "../constants";

export abstract class HttpService {
 private baseUrl: string;

 constructor(baseUrl = TWITTER_API_BASE_URL) {
  this.baseUrl = baseUrl;
 }

 protected async get<T = any>(
  uri: string,
  config?: any | undefined
 ): Promise<T> {
  return (await needle("get", `${this.baseUrl}${uri}`, config)).body;
 }

 protected async post<T = any>(
  uri: string,
  data?: any,
  config?: any | undefined
 ): Promise<T> {
  return (await needle("post", `${this.baseUrl}${uri}`, data, config)).body;
 }

 protected async patch<T = any>(
  uri: string,
  data?: any,
  config?: any | undefined
 ): Promise<T> {
  return (await needle("patch", `${this.baseUrl}${uri}`, data, config)).body;
 }

 protected async put<T = any>(
  uri: string,
  data?: any,
  config?: any | undefined
 ): Promise<T> {
  return (await needle("put", `${this.baseUrl}${uri}`, data, config)).body;
 }

 protected async delete<T = any>(
  uri: string,
  config?: any | undefined
 ): Promise<T> {
  return (await needle("delete", `${this.baseUrl}${uri}`, config)).body;
 }
}
