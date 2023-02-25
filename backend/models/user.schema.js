import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/index";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must Provide a name"],
      maxLength: [50, "Name must be less than 50 chars"],
    },
    email: {
      type: String,
      required: [true, "Must Provide a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "Must be atleast 8 characters"],
      select: false, // will not come by default whenever a query runs on database
    },
    role: {
      type: String,
      enum: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
);

// encrypt password
userSchema.pre("save", async function (next) {
  if (!this.modified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// add feature directly to schema
userSchema.methods = {
  // compare password
  comparePassowrd: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },

  // generate JWT token
  getJwtToken: function () {
    return JWT.sign(
      {
        _id: this._id,
        role: this.role,
      },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRY,
      }
    );
  },
};

export default mongoose.model("User", userSchema);
