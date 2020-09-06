export default async function findUser(collection, username) {
  return await collection.findOne({ username }).catch((err) => {
    throw err;
  });
}
