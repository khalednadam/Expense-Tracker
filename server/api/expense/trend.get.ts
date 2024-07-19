import { getServerSession } from "#auth";
import httpStatus from "http-status";
import { Expense } from "@/server/api/models/expense.model";
import mongoose from "mongoose";
import { Trend } from "~/types/types";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({
      message: "You are unauthenticated!",
      statusCode: httpStatus.UNAUTHORIZED,
    });
  }

  const userId = session.user._id;

  const result = await Expense.aggregate([
    {
      $match: { user: new mongoose.Types.ObjectId(userId), type: "withdrawal" },
    },
    { $group: { _id: "$category", totalSpent: { $sum: "$amount" } } },
    { $sort: { totalSpent: -1 } },
    { $limit: 1 },
  ]);
  return { data: result[0] as Trend };
});
