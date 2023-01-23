// server.js
const express = require('express');
const app = express();
const router=require('./routes');
require("./database");
const dotenv=require('dotenv');
dotenv.config({ path: "./config.env" });
app.use(express.json());
app.use(router);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
