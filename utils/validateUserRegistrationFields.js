export default function isUserRegistrationinfoValid(username, password) {
  if (
    !username ||
    !password ||
    typeof username !== "string" ||
    username.length < 5 ||
    typeof password !== "string" ||
    password.length < 8
  ) {
    return false;
  }
  return true;
}
