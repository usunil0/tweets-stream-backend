import { Rule, RulesPayload } from "../classes";
import { AuthorizedHttpService } from "./auth-http";
import { HttpService } from "./http";

interface RulesService {
 getAll: (config: any) => Promise<RulesPayload>;
 deleteAll: (data: any, config: any) => Promise<any>;
 set: (rule: Rule) => Promise<any>;
}

export class HttpRulesService
 extends AuthorizedHttpService
 implements RulesService {
 getAll = async (config?: any): Promise<RulesPayload> => {
  return await this.get("/tweets/search/stream/rules", config);
 };

 deleteAll = async (data: any, config?: any): Promise<any> => {
  return await this.post("/tweets/search/stream/rules", data, config);
 };

 set = async (data: any, config?: any): Promise<any> => {
  return await this.post("/tweets/search/stream/rules", data, config);
 };
}
