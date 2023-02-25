import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide a name"],
    maxLength: [50, "Name must be less than 5 chars"],
  },
});
