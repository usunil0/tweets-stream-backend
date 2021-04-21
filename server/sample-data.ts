import { TweetData } from "./classes";

const mention = { start: 0, end: 16, username: "tweetsreliefbot" };

export const TWEET_DATA: TweetData = {
 data: {
  id: "1384589243226279936",
  referenced_tweets: [{ type: "replied_to", id: "1384541188607250433" }],
  conversation_id: "1384541188607250433",
  created_at: "2021-04-20T19:26:14.000Z",
  author_id: "1384145996561600512",
  public_metrics: {
   retweet_count: 0,
   reply_count: 0,
   like_count: 0,
   quote_count: 0
  },
  text: "@tweetsreliefbot  beds-needed",
  entities: { mentions: [mention] }
 },
 includes: {
  users: [
   {
    id: "1384145996561600512",
    name: "tweetsreliefbot",
    username: "tweetsreliefbot"
   }
  ],
  tweets: [
   {
    id: "1384541188607250433",
    conversation_id: "1384541188607250433",
    created_at: "2021-04-20T16:15:17.000Z",
    author_id: "1384145996561600512",
    public_metrics: {
     retweet_count: 0,
     reply_count: 1,
     like_count: 0,
     quote_count: 1
    },
    text: "@tweetsreliefbot  test"
   }
  ]
 },
 matching_rules: [{ id: 1384589149831762000, tag: null }]
};
