import express from "express";
import bcrypt from "bcrypt";

import isUsernameValid from "../utils/isUsernameValid";
import findUser from "../utils/findUser";
import isPasswordValid from "../utils/isPasswordValid";

const router = express.Router();

router.get("/", async (req, res) => {
  const allUsers = await req.app.locals.db.users
    .find({}, { _id: 0, username: 1 })
    .toArray();
  res.render("layout", { page: "allUsersPartial", pageProps: { allUsers } });
});

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

router.get("/:username/edit", async (req, res) => {
  const { username } = req.params;
  if (username && username === req.app.locals.user.username) {
    res.render("layout", { page: "editPartial", pageProps: { username } });
  } else {
    res.status(401).render("layout", {
      page: "messagePartial",
      pageProps: {
        message: "Unauthorized.",
      },
    });
  }
});

router.post("/:username/edit", async (req, res) => {
  const { username } = req.params;
  const { username: newUsername, password: newPassword } = req.body;

  if (
    newUsername &&
    !(await findUser(req.app.locals.db.users, newUsername)) &&
    isUsernameValid(newUsername) &&
    username === req.app.locals.user.username
  ) {
    await req.app.locals.db.users
      .updateOne({ username }, { $set: { username: newUsername } })
      .catch((err) => {
        throw err;
      });
    const user = await findUser(req.app.locals.db.users, newUsername).catch(
      (err) => {
        throw err;
      }
    );
    req.session.user.username = user.username;
    res.redirect(`/users/${newUsername}`);
  } else if (
    newPassword &&
    isPasswordValid(newPassword) &&
    username === req.app.locals.user.username
  ) {
    const hashedPassword = await bcrypt.hash(newPassword, 10).catch((err) => {
      throw err;
    });
    await req.app.locals.db.users
      .updateOne({ username }, { $set: { hashedPassword } })
      .catch((err) => {
        throw err;
      });
    res.redirect(`/users/${username}`);
  } else {
    res.status(401).render("layout", {
      page: "messagePartial",
      pageProps: {
        message:
          "Unauthorized, or provided user info is invalid / already taken.",
      },
    });
  }
});

router.post("/:username", async (req, res) => {
  const { username } = req.params;
  const body = req.body;
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
