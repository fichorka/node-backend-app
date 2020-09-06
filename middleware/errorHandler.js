export default async function errorHandler(error) {
  res.render("layout", {
    page: "messagePartial",
    pageProperties: { message: error.message },
  });
}
