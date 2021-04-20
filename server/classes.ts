export interface Meta {
 meta?: { sent: string };
}

export interface Rule extends Meta {
 id: string;
 value?: string;
 tag?: string | null;
}

export interface RulesPayload {
 data: Rule[];
}

export interface PublicMetrics {
 retweet_count: 0;
 reply_count: 0;
 like_count: 0;
 quote_count: 0;
}

export interface ReferencedTweet {
 type: "quoted" | "replied_to";
 id: string;
}

export interface Tweet {
 created_at: string;
 conversation_id: string;
 public_metrics: PublicMetrics;
 text: string;
 author_id: string;
 id: string;
 referenced_tweets?: ReferencedTweet[];
}

export type TweetTextType = "needed" | "available";

export interface TweetModel extends Tweet {
 tweet_text_type: TweetTextType;
 tweet_text_keyword: string;
 tweet_keywords: string[];
}

export interface User {
 id: string;
 name: string;
 username: string;
}

export interface TweetData {
 data: Tweet;
 includes: {
  users: User[];
  tweets?: Tweet[];
 };
 matching_rules: Rule[];
}
