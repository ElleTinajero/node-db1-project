const express = require("express");
const accountRouter = require("./Routers/accountRouter")
const db = require("./data/dbConfig")

const server = express();
const PORT = process.env.PORT || 5000;

server.use(express.json());
server.use(accountRouter)

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});









