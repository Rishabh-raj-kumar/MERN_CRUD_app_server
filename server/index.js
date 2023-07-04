const express = require("express");
const cors = require("cors");
const app = express();
require('./db/conn');
const users = require("./models/userSchema");

require('dotenv').config();
const router = require('./routes/router');


app.use(express.json());
app.use(cors());
app.use(router);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`http://localhost:` + port);
});
