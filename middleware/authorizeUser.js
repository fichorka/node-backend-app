import findUser from "../utils/findUser";
import bcrypt from "bcrypt";

export default async function authenticateUser(req, res, next) {
  const user = {};
  if (req.session.user) user.username = req.session.user.username;
  req.app.locals.user = user;

  next();
}
