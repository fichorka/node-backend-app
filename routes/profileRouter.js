import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("layout", {
    page: "profilePartial",
    info: {
      username: "FiloBilo",
      accountDate: "Sep 20",
    },
  });
});

export default router;
