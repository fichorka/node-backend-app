export default function isPasswordValid(password) {
  if (!password || typeof password !== "string" || password.length < 8) {
    return false;
  }
  return true;
}
