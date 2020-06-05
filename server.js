// Server Setup
const express = require("express");
const server = express();
server.use(express.json());

// Router Imports
const projectRouter = require("./routers/projectRouter");
const actionRouter = require("./routers/actionRouter");

// Route Binding
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => res.send("Server running!"));

module.exports = server;
