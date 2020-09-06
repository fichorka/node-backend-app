import express from "express";
import registerUser from "../middleware/registerUser";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("layout", { page: "registerPartial", pageProps: {} });
});

router.post("/", registerUser);

export default router;
