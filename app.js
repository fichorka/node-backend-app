import dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";

import indexRouter from "./routes/indexRouter";
import loginRouter from "./routes/loginRouter";
import logoutRouter from "./routes/logoutRouter";
import registerRouter from "./routes/registerRouter";
import profileRouter from "./routes/profileRouter";
import database from "./middleware/database";
import authenticateUser from "./middleware/authenticateUser";
import authorizeUser from "./middleware/authorizeUser";

const { PORT } = process.env;

const app = express();

// middleware
app.use(database);
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "scrt-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(authorizeUser);

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/register", registerRouter);
app.use("/user/", profileRouter);

app.listen(3001, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
