import findUser from "../utils/findUser";
import bcrypt from "bcrypt";
import isUserRegistrationinfoValid from "../utils/validateUserRegistrationFields";

export default async function registerUser(req, res, next) {
  const { username, password } = req.body;
  const usersCollection = req.app.locals.db.users;

  let error = false;
  let status = 200;
  let message = "";

  // validate
  if (!isUserRegistrationinfoValid(username, password)) {
    req.app.locals.status = 400;
    next(new Error("Registration failed, Invalid input."));
  }

  if (await findUser(usersCollection, username)) {
    req.app.locals.status = 400;
    next(
      new Error(`Registration failed. Username ${username} is already taken.`)
    );
  }

  // register
  const hashedPassword = await bcrypt.hash(password, 10);
  await usersCollection
    .insertOne({ username, hashedPassword, dateCreated: Date() })
    .then((dbRes) => {
      res.status(status).render("layout", {
        page: "messagePartial",
        pageProps: {
          message: `Registration Successfull. User ${username} created.`,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      req.app.locals.status = 500;
      next(new Error(`Registration failed, database error.`));
    });
}
