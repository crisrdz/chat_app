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
    toJSON: {
      virtuals: true
    }
  }
);

export default model("Chat", chatSchema);
