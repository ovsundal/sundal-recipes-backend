const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/users/", usersRoutes);

app.use((req, res, next) => {
  throw new HttpError("Route not found", 404);
});

app.use((err, req, res, next) => {
  res.status(err.code || 500);
  res.json({ message: err.message || "An unknown error occurred!" });
});

app.listen(5000);
