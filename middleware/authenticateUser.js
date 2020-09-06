import findUser from "../utils/findUser";
import bcrypt from "bcrypt";

export default async function authenticateUser(req, res, next) {
  const { username, password } = req.body;

  const user = await findUser(req.app.locals.db.users, username);
  if (user && user.username && user.password) {
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
    if (isPasswordCorrect) {
      req.session.user = { username: user.username };
    }
  }
}
