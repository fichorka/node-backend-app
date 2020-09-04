import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("layout", { page: "homePartial", info: null });
});

export default router;
