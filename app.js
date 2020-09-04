import dotenv from "dotenv";
dotenv.config();
import express from "express";

const { PORT } = process.env;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
