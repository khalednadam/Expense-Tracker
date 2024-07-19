import { getServerSession } from "#auth";
import httpStatus from "http-status";
import { Expense } from "../../models/expense.model";
import { UserScheme } from "../../models/user.model";
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({
      message: "You are unauthenticated!",
      statusCode: httpStatus.UNAUTHORIZED,
    });
  }
  const expenseId = getRouterParam(event, "expenseId");
  const expense = await Expense.findById(expenseId);
  if (!expense) {
    throw createError({
      message: "Expense not found!",
      statusCode: httpStatus.NOT_FOUND,
    });
  }
  if (expense.user != session.user._id) {
    throw createError({
      message: "You are not authorized to perform this action",
      statusCode: httpStatus.UNAUTHORIZED,
    });
  }

  const data = await Expense.findByIdAndDelete(expenseId);
  const user = await UserScheme.findById(session.user._id);
  if (data && user && data?.type === "deposit") {
    await UserScheme.findByIdAndUpdate(session.user._id, {
      totalBalance: user.totalBalance - data.amount,
    });
  } else if (data && user && data?.type === "withdrawal") {
    await UserScheme.findByIdAndUpdate(session.user._id, {
      totalBalance: user.totalBalance + data.amount,
    });
  }

  return {
    data,
  };
});
