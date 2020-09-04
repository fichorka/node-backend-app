import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const user = await req.app.locals.db.users.findOne();
  console.log(user.username);
  res.render("layout", {
    page: "profilePartial",
    info: {
      username: user.username,
      accountDate: "Sep 20",
    },
  });
});

export default router;
