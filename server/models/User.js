import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
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
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
        required: true,
      },
    ],
    friends: {
      type: [
        {
          ref: "User",
          type: Schema.Types.ObjectId,
        },
      ],
      validate: [friendsLimit, "{PATH} exceeds the limit of 50"],
    },
    friendRequests: [
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

function friendsLimit(val) {
  return val.length <= 50;
}

userSchema.statics.encryptPassword = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword;
};

userSchema.statics.comparePasswords = async (password, passwordDB) => {
  const result = await bcrypt.compare(password, passwordDB);
  return result;
};

export default model("User", userSchema);
