import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("layout", {
    page: "homePartial",
    pageProps: { username: req.session.username },
  });
});

export default router;
