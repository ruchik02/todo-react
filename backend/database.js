const mongoose = require("mongoose");
require('dotenv').config()
const link='mongodb://ruchika:ruchikasharma@ac-h2nemxv-shard-00-00.mfluhic.mongodb.net:27017,ac-h2nemxv-shard-00-01.mfluhic.mongodb.net:27017,ac-h2nemxv-shard-00-02.mfluhic.mongodb.net:27017/?ssl=true&replicaSet=atlas-higqef-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.set("strictQuery", "false");
mongoose.connect(link, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected')
}).catch(err => {
    console.log(`MongoDB connection error: ${err}`);
    process.exit();
});
