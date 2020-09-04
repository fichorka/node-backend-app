import dotenv from "dotenv";
dotenv.config();
import express from "express";
import indexRouter from "./routes/indexRouter";
import loginRouter from "./routes/loginRouter";
import registerRouter from "./routes/registerRouter";
import profileRouter from "./routes/profileRouter";

const { PORT } = process.env;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/profile", profileRouter);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
