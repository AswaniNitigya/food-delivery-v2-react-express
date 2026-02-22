import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true },
);

const TestUser = mongoose.model("TestUser", userSchema);
export default TestUser;
