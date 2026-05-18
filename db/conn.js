const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

if (!process.env.MONGO_URI) {
  const { seedLocalData } = require("./localStore");
  seedLocalData();
  console.log("Using seeded local in-memory database");
  module.exports = Promise.resolve();
} else {
  const client = mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.log("Error: ", error);
      return error;
    });

  module.exports = client;
}
