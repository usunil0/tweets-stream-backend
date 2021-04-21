import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import * as mongoose from "mongoose";

import {
 Entities,
 PublicMetrics,
 ReferencedTweet,
 Tweet,
 ReliefTweet,
 TweetTextType,
 User
} from "../classes";

@modelOptions({
 schemaOptions: { collection: "tweets" },
 options: { allowMixed: 0 }
})
export class TweetSchema implements ReliefTweet {
 @prop({ required: true })
 public created_at: string = "";

 @prop({ required: true })
 public conversation_id: string = "";

 @prop({ type: mongoose.Schema.Types.Mixed })
 public public_metrics: PublicMetrics = {} as PublicMetrics;

 @prop({ type: Array })
 public referenced_tweets: ReferencedTweet[] = [];

 @prop({ type: String, required: true })
 public replied_text: string = "";

 @prop({ type: String, required: true })
 public referenced_text: string = "";

 @prop({ type: String, required: true })
 public tweet_text_type: TweetTextType = "needed";

 @prop({ type: String, required: true })
 public tweet_text_keyword: string = "";

 @prop({ type: [String], required: false })
 public tweet_keywords: string[] = [];

 @prop({ type: Object })
 public entities: Entities = { mentions: [] };

 @prop({ type: Object, required: true })
 public replied_user: User = {} as User;

 @prop({ type: Object, required: true })
 public referenced_user: User = {} as User;
}

const TweetModel = getModelForClass(TweetSchema);

export default TweetModel;
