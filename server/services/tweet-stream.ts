import needle from "needle";

import { TWITTER_API_BASE_URL } from "../constants";
import { AuthorizedHttpService } from "./auth-http";

interface StreamService {
 getNew: () => Promise<NodeJS.ReadableStream>;
}

export class HttpStreamService
 extends AuthorizedHttpService
 implements StreamService {
 getNew = async (): Promise<NodeJS.ReadableStream> => {
  const authHeader = await this.getTokenHeader();

  const response = needle.get(
   `${TWITTER_API_BASE_URL}/tweets/search/stream?tweet.fields=public_metrics,created_at,conversation_id&expansions=author_id,referenced_tweets.id`,
   {
    headers: { ...authHeader }
   }
  );

  return response;
 };
}
