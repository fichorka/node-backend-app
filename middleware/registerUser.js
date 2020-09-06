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
  if (!username || !password) {
    error = true;
    status = 400;
    message = "Registration failed, no data provided.";
  }

  if (!error && !isUserRegistrationinfoValid(username, password)) {
    error = true;
    status = 400;
    message = "Registration failed, Invalid input.";
  }

  if (!error && (await findUser(usersCollection, username))) {
    error = true;
    status = 400;
    message = `Registration failed. Username ${username} is already taken.`;
  }

  // try registering
  if (!error) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection
      .insertOne({ username, hashedPassword, dateCreated: Date() })
      .then((res) => {
        status = 201;
        message = `Registration Successfull. User ${username} created.`;
      })
      .catch((err) => {
        status = 500;
        message = "Registration failed, database error.";
      });
  }

  res.status(status).render("layout", {
    page: "messagePartial",
    pageProps: { message },
  });
}
