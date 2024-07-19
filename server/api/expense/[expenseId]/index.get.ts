import { getServerSession } from "#auth";
import httpStatus from "http-status";
import { Expense } from "../../models/expense.model";
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

  if (expense && expense.user !== session.user._id) {
    throw createError({
      message: "You are not authorized",
      statusCode: httpStatus.UNAUTHORIZED,
    });
  }

  return {
    expense,
  };
});
