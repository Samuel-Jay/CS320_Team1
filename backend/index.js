const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const { config } = require("./config");
const port = 5000;

mongoose.connect(
  `mongodb+srv://${config.username}:${config.password}@${config.cluster}.mongodb.net/${config.db}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on("error", (error) => console.log(error));
mongoose.connection.once("open", () =>
  console.log("Database connected successfully!")
);
mongoose.Promise = global.Promise;

require("./auth/auth");

const routes = require("./routes/routes");
const secureRoute = require("./routes/secure-routes");

const app = express();

app.use(express.json());
app.use("/api", routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(port, () => {
  console.log(
    "Server started at port 3000, available at http://localhost:3000."
  );
});
