import { getServerSession } from "#auth";
import httpStatus from "http-status";
import { Expense } from "../models/expense.model";
import { UserScheme } from "../models/user.model";
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({
      message: "You are unauthenticated!",
      statusCode: httpStatus.UNAUTHORIZED,
    });
  }
  const body = await readBody(event);
  if (!body.amount) {
    throw createError({
      message: "Please enter the amount",
      statusCode: httpStatus.BAD_REQUEST,
    });
  }
  if (!body.category) {
    throw createError({
      message: "Please enter the category",
      statusCode: httpStatus.BAD_REQUEST,
    });
  }
  if (!body.type) {
    throw createError({
      message: "Please enter the type",
      statusCode: httpStatus.BAD_REQUEST,
    });
  }
  const expense = await Expense.create({ ...body, user: session.user._id });
  const user = await UserScheme.findById(session.user._id);
  if (user && body.type === "withdrawal") {
    await UserScheme.findByIdAndUpdate(session.user._id, {
      totalBalance: user.totalBalance - parseFloat(body.amount),
    });
  } else if (user && body.type === "deposit") {
    await UserScheme.findByIdAndUpdate(session.user._id, {
      totalBalance: user.totalBalance + parseFloat(body.amount),
    });
  }
  return {
    expense,
  };
});
