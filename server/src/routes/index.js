let userRouter = require("./user");
let topicRouter = require("./topic");

function route(app) {
  app.use("/user", userRouter);
  app.use("/topic", topicRouter);
}

module.exports = route;
