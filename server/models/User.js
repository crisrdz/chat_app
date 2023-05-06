import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: false,
    },
    friends: [
      {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword;
};

userSchema.statics.comparePasswords = async (password, passwordDB) => {
  const result = await bcrypt.compare(password, passwordDB);
  return result;
};

export default model("User", userSchema);
