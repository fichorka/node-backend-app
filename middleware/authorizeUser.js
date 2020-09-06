import findUser from "../utils/findUser";
import bcrypt from "bcrypt";

export default async function authenticateUser(req, res, next) {
  const user = { username: "filipos" };
  req.app.locals.user = user;

  //   if (req.session.user) user.username = req.session.user.username;
  next();
}
