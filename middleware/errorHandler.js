export default async function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(req.app.locals.status || 500).render("layout", {
    page: "messagePartial",
    pageProps: {
      message: err.message,
    },
  });
}
