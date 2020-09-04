import mongodb, { MongoClient } from "mongodb";

export default async function database(req, res, next) {
  MongoClient.connect(process.env.DB_CONNECTION_STRING, (err, client) => {
    if (err) throw err;

    const db = client.db(process.env.DB_NAME);
    const users = db.collection("users");

    req.app.locals.db = { users };
    next();
  });
}
