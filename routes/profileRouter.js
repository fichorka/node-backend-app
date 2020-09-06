import express from "express";

const router = express.Router();

router.get("/:username", async (req, res) => {
  setTimeout(function () {
    if (!res.headersSent) {
      res.send("timeout");
    }
  }, 3000);

  const { username } = req.params;
  const user = await req.app.locals.db.users
    .findOne({ username })
    .catch((err) => {
      throw err;
    });

  if (user) {
    res.render("layout", {
      page: "profilePartial",
      pageProps: {
        username: user.username,
        accountDate: "Sep 20",
      },
    });
  } else {
    res.status(404).send("User doesn't exist");
  }
});

export default router;
