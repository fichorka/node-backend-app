import mongodb, { MongoClient } from "mongodb";

export default async function errorHandler(error) {
  res.render('layout', pageProperties: {message: error.message})
  });
}
