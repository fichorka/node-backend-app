import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("layout", { page: "loginPartial", info: null });
});

export default router;
