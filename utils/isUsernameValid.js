export default function isUsernameValid(username) {
  if (!username || typeof username !== "string" || username.length < 5) {
    return false;
  }
  return true;
}
