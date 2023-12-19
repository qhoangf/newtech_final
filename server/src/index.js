const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const route = require("./routes");

const db = require("./database");
const app = express();

db.connect();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

route(app);
app.listen(8000, () => {
  console.log("Server is running");
});
