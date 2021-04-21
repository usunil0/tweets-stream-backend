import mongoose = require("mongoose");

const http = require("http");
const util = require("util");
const express = require("express");

const config = require("dotenv").config();
const app = express();
const server = http.createServer(app);

import { HttpRulesService } from "./services/rules";
import { HttpStreamService } from "./services/tweet-stream";
import { RULES, PORT, DATABASE_URL, DATABASE_NAME } from "./constants";
import { RulesPayload, ReliefTweet, TweetData } from "./classes";
import {
 getReferencedTweet,
 getTweetDataToReliefTweet,
 isBotMentioned,
 isJson
} from "./utils";
import { TWEET_DATA } from "./sample-data";

import TweetModel, { TweetSchema } from "./models/tweet";

const rulesService = new HttpRulesService();
const streamService = new HttpStreamService();

// Get stream rules
async function getRules() {
 const response = await rulesService.getAll();
 return response;
}

async function setRules() {
 const data = {
  add: RULES
 };

 const response = await rulesService.set(data, {
  headers: {
   "content-type": "application/json"
  }
 });

 return response;
}

async function deleteRules(rules: RulesPayload) {
 if (!Array.isArray(rules.data)) {
  return null;
 }

 const ids = rules.data.map(rule => rule.id);

 const data = {
  delete: {
   ids: ids
  }
 };

 const response = await rulesService.deleteAll(data, {
  headers: {
   "content-type": "application/json"
  }
 });

 return response;
}

async function streamTweets() {
 const stream = await streamService.getNew();

 stream.on("data", (data: any) => {
  newDataReceived(data);
 });

 return stream;
}

const newDataReceived = (data: any) => {
 try {
  if (isJson(data)) {
   const json = JSON.parse(data);

   if (isBotMentioned(json)) {
    saveTweet(json);
   }
   //log it
   console.log(util.inspect(json, false, null, true));
  } else {
   //buffer logs
   console.log(util.inspect(JSON.parse(JSON.stringify(data))));
  }
 } catch (error) {
  console.log("error", error);
 }
};

const resetRules = async () => {
 let currentRules;
 try {
  currentRules = await getRules();

  await deleteRules(currentRules);

  await setRules();
 } catch (error) {
  console.error(error);
  process.exit(1);
 }
};

const saveTweet = async (tweetData: TweetData) => {
 const reliefTweet = getTweetDataToReliefTweet(tweetData);
 if (reliefTweet) {
  const { _id: id } = await TweetModel.create(reliefTweet as ReliefTweet);
 }
};

(async () => {
 await mongoose.connect(DATABASE_URL!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: DATABASE_NAME
 });

 await resetRules();
 const filteredStream = await streamTweets();
 let timeout = 0;
 filteredStream.on("timeout", () => {
  console.warn("A connection error occurred. Reconnecting…");
  setTimeout(() => {
   timeout++;
   streamTweets();
  }, 2 ** timeout);
 });
})();

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
