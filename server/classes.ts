export interface Meta {
 meta?: { sent: string };
}

export interface Rule extends Meta {
 id: number;
 value?: string;
 tag?: string | null;
}

export interface RulesPayload {
 data: Rule[];
}

export interface PublicMetrics {
 retweet_count: number;
 reply_count: number;
 like_count: number;
 quote_count: number;
}

export interface ReferencedTweet {
 type: "quoted" | "replied_to";
 id: string;
}

export interface Mention {
 start: number;
 end: number;
 username: string;
}

export interface Entities {
 mentions: Mention[];
}

export interface Tweet {
 created_at: string;
 conversation_id: string;
 public_metrics?: PublicMetrics;
 text: string;
 author_id: string;
 id?: string;
 referenced_tweets?: ReferencedTweet[];
 entities?: Entities;
}

export type TweetTextType = "needed" | "available";

export interface ReliefTweet {
 tweet_text_type: TweetTextType;
 tweet_text_keyword: string;
 tweet_keywords?: string[];
 created_at: string;
 conversation_id: string;
 public_metrics?: PublicMetrics;
 referenced_text: string;
 id?: string;
 referenced_tweets?: ReferencedTweet[];
 entities?: Entities;
 replied_text: string;
 replied_user: User;
 referenced_user: User;
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
