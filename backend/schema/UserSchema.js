const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
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
        managerId: {
            type: Number,
            required: false,
        },
        positionTitle: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        isManager: {
            type: Boolean,
            required: false,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
});

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
};

module.exports = UserSchema;
