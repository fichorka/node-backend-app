import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import session from "express-session";

import indexRouter from "./routes/indexRouter";
import loginRouter from "./routes/loginRouter";
import logoutRouter from "./routes/logoutRouter";
import registerRouter from "./routes/registerRouter";
import usersRouter from "./routes/usersRouter";
import database from "./middleware/database";
import authenticateUser from "./middleware/authenticateUser";
import errorHandler from "./middleware/errorHandler";

// these environment variables shouldn't be publicily visible, but this is an example app with no sensitive information
const { PORT, SESSION_SECRET } = process.env;

const app = express();

// settings
app.set("view engine", "ejs");
app.set("views", "views");

// middleware
app.use(database);
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  })
);
app.use(helmet());

// routes
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/register", registerRouter);
app.use("/users/", usersRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
