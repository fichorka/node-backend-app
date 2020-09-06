import express from "express";
import session from "express-session";

const router = express.Router();

router.get("/:username", async (req, res) => {
  setTimeout(function () {
    if (!res.headersSent) {
      res.send("timeout");
    }
  }, 3000);

  const { username } = req.params;
  if (username && username === req.app.locals.user.username) {
    const user = await req.app.locals.db.users
      .findOne({ username })
      .catch((err) => {
        throw err;
      });

    if (user) {
      res.render("layout", {
        page: "profilePartial",
        pageProps: {
          username: req.app.locals.user.username,
          accountDate: "Sep 20",
        },
      });
    } else {
      res.status(404).render("layout", {
        page: "messagePartial",
        pageProps: {
          message: "User doesn't exist.",
        },
      });
    }
  } else {
    res.status(401).render("layout", {
      page: "messagePartial",
      pageProps: {
        message: "Unauthorized.",
      },
    });
  }
});

router.post("/:username", async (req, res) => {
  const { username } = req.params;
  if (username && username === req.app.locals.user.username) {
    await req.app.locals.db.users.deleteOne({ username }).catch((err) => {
      throw err;
    });
    req.session.destroy();
    res.render("layout", {
      page: "messagePartial",
      pageProps: {
        message: "Profile Successfully deleted.",
      },
    });
  } else {
    res.status(401).render("layout", {
      page: "messagePartial",
      pageProps: {
        message: "Unauthorized.",
      },
    });
  }
});

export default router;
