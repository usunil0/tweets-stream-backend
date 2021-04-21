const config = require("dotenv").config();

export const TWITTER_API_BASE_URL = "https://api.twitter.com/2";

export const RULES = [{ value: "tweetsreliefbot" }];

export const PORT = process.env.PORT || 3000;

export const DATABASE_URL = process.env.DATABASE_URL;

export const DATABASE_NAME = process.env.DATABASE_NAME;

export const BOT_USERNAME = "tweetsreliefbot";
