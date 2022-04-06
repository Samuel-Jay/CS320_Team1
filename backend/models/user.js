var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    employeeId: {
        type: Number,
        required: true,
        unique: 1,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1,
    },
    companyId: {
        type: Number,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    positionTitle: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    managerId: {
        type: Number,
        required: false,
    },
    isManager: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
});

userSchema.methods.comparepassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return cb(next);
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user.email.toHexString(), confiq.SECRET);

    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};

userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    jwt.verify(token, config.SECRET, function (err, decode) {
        user.findOne({ _id: decode, token: token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        });
    });
};

userSchema.methods.deleteToken = function (token, cb) {
    var user = this;

    user.update({ $unset: { token: 1 } }, function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};

module.exports = userSchema;
