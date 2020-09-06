import express from "express";
import authenticateUser from "../middleware/authenticateUser";

const router = express.Router();

router.use((req, res, next) => {
  if (req.app.locals.user.username) res.redirect("/");
  else next();
});

router.get("/", (req, res) => {
  res.render("layout", {
    page: "loginPartial",
    pageProps: { username: req.app.locals.user.username },
  });
});

router.post("/", authenticateUser);

export default router;
