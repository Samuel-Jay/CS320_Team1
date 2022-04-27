const mongoose = require("mongoose");
const userSchema = require("../schema/UserSchema");

const getUserDetails = async (key, value, companyDB) => {
  const UserModel = mongoose.connection
    .useDb(companyDB)
    .model("users", userSchema);

  const user = await UserModel.findOne({ [key]: value })
    .then((user) => {
      if (!user) {
        return null;
      }
      return user;
    })
    .catch((error) => {});
  return user;
};
module.exports = getUserDetails;
