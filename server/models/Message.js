import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    chat: {
      ref: "Chat",
      type: Schema.Types.ObjectId,
      required: true,
    },
    seen: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Message", messageSchema);
