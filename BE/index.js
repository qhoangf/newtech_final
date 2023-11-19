let express = require("express");
let cookieParser = require("cookie-parser");
let cors = require("cors");
let route = require("./routes")

let db = require("./config/db");
let app = express();

db.connect();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

route(app);
app.listen(8000, () => {
     console.log("Server is running")
})