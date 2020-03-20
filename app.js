const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users-routes");
const recipesRoutes = require("./routes/recipes-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/users/", usersRoutes);
app.use("/api/recipes/", recipesRoutes);

app.use((req, res, next) => {
  throw new HttpError("Route not found", 404);
});

app.use((err, req, res, next) => {
  res.status(err.code || 500);
  res.json({ message: err.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-tz9dz.azure.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => app.listen(process.env.PORT || 5000))
  .catch(err => {
    console.log(err);
  });
