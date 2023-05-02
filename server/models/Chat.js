import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    users: [
      {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    ],
    messages: [
      {
        ref: "Message",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Chat", chatSchema);
