import express from "express";
import authenticateUser from "../middleware/authenticateUser";

const router = express.Router();

router.use((req, res, next) => {
  if (!req.app.locals.user.username) res.redirect("/");
  else next();
});

router.get("/", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

export default router;
