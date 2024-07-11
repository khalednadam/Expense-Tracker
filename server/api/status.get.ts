import mongoose from "mongoose";
export default defineEventHandler((event) => {
  return mongoose.connection.readyState;
});
