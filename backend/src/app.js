// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser=require('body-parser');
const router=require('./routes');
require("./database");
const dotenv=require('dotenv');
// console.log(process.env.URL);
dotenv.config({ path: "./config.env" });
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
