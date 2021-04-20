import { Rule, RulesPayload } from "./classes";
import needle from "needle";
import { HttpRulesService } from "./services/rules";
import { RULES } from "./constants";
import { HttpStreamService } from "./services/tweet-stream";
import { isJson } from "./utils";
const http = require("http");
const util = require("util");
const express = require("express");

const config = require("dotenv").config();
const TOKEN = process.env.TWITTER_BEARER_TOKEN;
const PORT = process.env.PORT || 3000;

const app = express();

const server = http.createServer(app);

const rulesService = new HttpRulesService();
const streamService = new HttpStreamService();

// Get stream rules
async function getRules() {
 const response = await rulesService.getAll();

 return response;
}

// Set stream rules
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

// Delete stream rules
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

 console.log("starting stream");

 stream.on("data", (data: any) => {
  newDataReceived(data);
 });

 return stream;
}

const newDataReceived = (data: any) => {
 try {
  if (isJson(data)) {
   const json = JSON.parse(data);
   console.log(util.inspect(json, false, null, true /* enable colors */));
  } else {
   console.log(JSON.parse(JSON.stringify(data.toString("utf8"))));
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

  // Set rules based on array above
  await setRules();
 } catch (error) {
  console.error(error);
  process.exit(1);
 }
};

(async () => {
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
