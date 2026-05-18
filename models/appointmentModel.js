if (!process.env.MONGO_URI) {
  module.exports = require("../db/localStore").Appointment;
} else {
const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    reminder: {
      type: Boolean,
      default: false,
    },
    doctorNote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", schema);

module.exports = Appointment;
}
