import { ReliefTweet, TweetData, TweetTextType } from "./classes";
import { BOT_USERNAME } from "./constants";

export const isJson = (str: string) => {
 try {
  JSON.parse(str);
 } catch (e) {
  return false;
 }
 return true;
};

export const isBotMentioned = (tweet: TweetData) => {
 return tweet.data.entities?.mentions
  .map(mention => mention.username)
  .includes(BOT_USERNAME);
};

export const getReferencedTweet = (tweet: TweetData) => {
 return tweet.includes.tweets ? tweet.includes.tweets[0] : undefined;
};

export const getTweetDataToReliefTweet = (
 tweet: TweetData
): ReliefTweet | undefined => {
 const referencedTweet = getReferencedTweet(tweet) || tweet.data;

 const replyTweet = tweet.data;

 console.log(referencedTweet, replyTweet);
 const tweetTypeAndKeyword = getTweetTextTypeAndKeyword(
  sliceMentionText(
   replyTweet.text,
   replyTweet.entities?.mentions.find(
    mention => mention.username === BOT_USERNAME
   )?.end!
  )
 );

 console.log(tweetTypeAndKeyword);

 if (!tweetTypeAndKeyword.type) return;

 return {
  referenced_text: referencedTweet?.text,
  replied_text: replyTweet.text,
  created_at: referencedTweet.created_at,
  conversation_id: referencedTweet.conversation_id,
  conversation_author_id: referencedTweet.author_id,
  replied_author_id: tweet.data.author_id,
  tweet_text_type: tweetTypeAndKeyword.type as TweetTextType,
  tweet_text_keyword: tweetTypeAndKeyword.keyword || "",
  tweet_keywords: []
 };
};

const getTweetTextTypeAndKeyword = (tweet: string) => {
 var matches = tweet.match(/([a-z]+)-([a-z]+)/);

 var keyword = matches && matches[1];
 var type = matches && matches[2];
 return {
  keyword,
  type
 };
};

export const sliceMentionText = (tweetText: string, botMentionEnd: number) => {
 return tweetText.slice(botMentionEnd);
};
