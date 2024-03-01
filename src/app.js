const express = require("express");
const app = express();

const ticketRouter = require("./controller/TicketRouter");
const registerRouter = require("./controller/registerUsersRouter");
const loginRouter = require("./controller/loginRouter");

app.use(express.json());

const logger = require("./util/logger");

app.use((req, res, next) => {
  logger.info(`Incoming ${req.method} : ${req.url}`);
  next();
});

const PORT = 3000;

app.use("/tickets", ticketRouter);

app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

