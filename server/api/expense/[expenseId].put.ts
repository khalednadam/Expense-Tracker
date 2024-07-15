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
  const expenseId = getRouterParam(event, "expenseId");
  const expense = await Expense.findById(expenseId);
  const updatedExpense = await Expense.findByIdAndUpdate(expenseId, body);
  const user = await UserScheme.findById(session.user._id);

  if (
    expense &&
    (expense.amount !== parseFloat(body.amount) || expense.type !== body.type)
  ) {
    if (user && body.type === "withdrawal") {
      await UserScheme.findByIdAndUpdate(session.user._id, {
        totalBalance: user.totalBalance - parseFloat(body.amount),
      });
    } else if (user && body.type === "deposit") {
      await UserScheme.findByIdAndUpdate(session.user._id, {
        totalBalance: user.totalBalance + parseFloat(body.amount),
      });
    }
  }

  return {
    updatedExpense,
  };
});
