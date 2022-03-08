const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const { config, companies } = require("./config");
const userSchema = require("./models/user");
const { login } = require("./controllers/login");

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());

mongoose.connect(
  `mongodb+srv://${config.username}:${config.password}@${config.cluster}.mongodb.net/${config.db}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var db = mongoose.connection;
var User = db.model("users", userSchema);
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.post("/api/login", function (req, res) {
  const companyDB = companies.get(req.body.email.split("@")[1]);
  db = mongoose.connection.useDb(companyDB);
  User = db.model("users", userSchema);

  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) return res(err);
    if (user)
      return res.status(400).json({
        error: true,
        message: "You are already logged in",
      });
    else {
      User.findOne(
        { email: req.body.email, password: req.body.password },
        function (err, user) {
          if (!user)
            return res.json({
              isAuth: false,
              message: "Invalid username or password",
            });
          // else
          //   return res.json({
          //     isAuth: true,
          //     message: "Successful login",
          //     data: user,
          //   });
          user.comparepassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
              return res.json({
                isAuth: false,
                message: "password doesn't match",
              });

            user.generateToken((err, user) => {
              if (err) return res.status(400).send(err);
              res.cookie("auth", user.token).json({
                isAuth: true,
                id: user.employeeId,
                email: user.email,
              });
            });
          });
        }
      );
    }
  });
});

app.get("/api/dashboard", login, (req, res) => {
  res.json({
    isAuth: true,
    id: req.user.employeeId,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  });
});

app.get("/api/logout", login, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Team1 listening on port ${port}: http://localhost:${port}\n `);
});
