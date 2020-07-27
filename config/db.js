// import mongoose from "mongoose";
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

// export { connectDB };
module.exports = connectDB;
