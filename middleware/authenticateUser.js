import findUser from "../utils/findUser";
import bcrypt from "bcrypt";

export default async function authenticateUser(req, res, next) {
  const { username, password } = req.body;

  const dbUser = await findUser(req.app.locals.db.users, username);
  if (dbUser && dbUser.username && dbUser.hashedPassword) {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      dbUser.hashedPassword
    );
    if (isPasswordCorrect) {
      req.session.username = dbUser.username;
      req.session.dateCreated = dbUser.dateCreated;
      res.redirect("/");
    } else {
      req.app.locals.status = 401;
      next(new Error(`Invalid password.`));
    }
  } else {
    req.app.locals.status = 409;
    next(new Error(`User ${username} doesn't exist.`));
  }
}
