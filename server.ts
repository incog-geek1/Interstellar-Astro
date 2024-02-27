import express from "express";
import { createServer } from "http";
import { handler as ssrHandler } from "./dist/server/entry.mjs";
import basicAuth from "express-basic-auth";
import { createBareServer } from "@nebula-services/bare-server-node";
import config from "./config.ts";
const port = process.env.PORT || 8080;
const bare = createBareServer("/v/");
const app = express();
if (config.auth.challenge) {
  console.log(
    "Password protection is enabled. Usernames are: " +
      Object.keys(config.auth.users),
  );
  console.log("Passwords are: " + Object.values(config.auth.users));

  app.use(
    basicAuth({
      users: config.auth.users,
      challenge: true,
    }),
  );
}
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("dist/client/"));
  app.use(ssrHandler);
}
const server = createServer();
server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.listen({
  port: port,
});
