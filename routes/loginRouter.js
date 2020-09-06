import express from "express";
import authenticateUser from "../middleware/authenticateUser";

const router = express.Router();

router.use((req, res, next) => {
  if (req.session.username) res.redirect("/");
  else next();
});

router.get("/", (req, res) => {
  res.render("layout", {
    page: "loginPartial",
    pageProps: { username: req.session.username },
  });
});

router.post("/", authenticateUser);

export default router;
