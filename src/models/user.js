const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 30,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 30,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      uniqued: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
    contactNumber: {
      type: String,
    },
    pofilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  console.log("---------------");
  this.hash_password = bcrypt.hashSync(password, 10);
  console.log(this.hash_password);
});

userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};
module.exports = mongoose.model("User", userSchema);
