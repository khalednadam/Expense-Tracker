import mongoose, { Document, Model, Schema, Types } from "mongoose";

const expense = new Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    category:{
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: true,
      enum: ["withdrawal", "deposit"]
    },
    serviceName: {
      type: String,
      required: true
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const Expense = mongoose.model("Expense", expense);