if (!process.env.MONGO_URI) {
  module.exports = require("../db/localStore").Notification;
} else {
const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", schema);

module.exports = Notification;
}
