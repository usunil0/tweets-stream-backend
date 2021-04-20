import { prop, getModelForClass } from "@typegoose/typegoose";
import {
 PublicMetrics,
 ReferencedTweet,
 Tweet,
 TweetModel,
 TweetTextType
} from "../classes";

class TweetSchema implements TweetModel {
 @prop({ required: true })
 public created_at: string = "";

 @prop({ required: true })
 public conversation_id: string = "";

 @prop()
 public public_metrics: PublicMetrics = {} as PublicMetrics;

 @prop({ required: true })
 public author_id: string = "";

 @prop({ type: () => String, required: true })
 public id: string = "";

 @prop({ type: () => [], required: false })
 public referenced_tweets?: ReferencedTweet[];

 @prop({ type: () => String, required: true })
 public text: string = "";

 @prop({ type: () => String, required: true })
 public tweet_text_type: TweetTextType = "needed";

 @prop({ type: () => String, required: true })
 public tweet_text_keyword: string = "";

 @prop({ type: () => [String], required: true })
 public tweet_keywords: string[] = [];
}

const TweetModel = getModelForClass(TweetSchema);
