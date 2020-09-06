import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("layout", {
    page: "loginPartial",
    pageProps: { username: req.app.locals.user.username },
  });
});

export default router;
