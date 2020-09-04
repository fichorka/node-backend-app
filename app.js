import dotenv from "dotenv";
dotenv.config();
import express from "express";
import indexRouter from "./routes/indexRouter";
import loginRouter from "./routes/loginRouter";
import registerRouter from "./routes/registerRouter";
import profileRouter from "./routes/profileRouter";
import database from "./middleware/database";

const { PORT } = process.env;

const app = express();

// middleware
app.use(database);

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/profile", profileRouter);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
