const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const route = require("./routes");

const db = require("./database");
const app = express();

db.connect();

// app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

route(app);
app.listen(8000, () => {
  console.log("Server is running");
});
