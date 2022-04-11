const passport = require("passport");
const mongoose = require("mongoose");
const localStrategy = require("passport-local").Strategy;
const UserSchema = require("../schema/UserSchema");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { companies } = require("../config");

passport.use(
    new JWTstrategy(
        {
            secretOrKey: "TOP_SECRET",
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "signup",
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                var userData = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    employeeId: req.body.employeeId,
                    email: email,
                    companyId: req.body.companyId,
                    companyName: req.body.companyName,
                    positionTitle: req.body.positionTitle,
                    startDate: req.body.startDate,
                    managerId: req.body.managerId,
                    isManager: req.body.isManager,
                    password: password,
                };
                const companyDB = companies.get(email.split("@")[1]);
                const UserModel = mongoose.connection
                    .useDb(companyDB)
                    .model("users", UserSchema);
                const user = await UserModel.create(userData);

                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "login",
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const companyDB = companies.get(email.split("@")[1]);
                const UserModel = mongoose.connection
                    .useDb(companyDB)
                    .model("users", UserSchema);
                const user = await UserModel.findOne({ email });

                if (!user) {
                    return done(null, false, { message: "User not found" });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: "Wrong Password" });
                }

                return done(null, user, { message: "Logged in Successfully" });
            } catch (error) {
                return done(error);
            }
        }
    )
);
