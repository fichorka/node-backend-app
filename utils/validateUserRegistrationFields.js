import isUsernameValid from "./isUsernameValid";
import isPasswordValid from "./isPasswordValid";

export default function isUserRegistrationinfoValid(username, password) {
  return isUsernameValid(username) && isPasswordValid(password);
}
