import { getServerSession } from "#auth";
import httpStatus from "http-status";
import { Expense } from "@/server/api/models/expense.model";
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({
      message: "You are unauthenticated!",
      statusCode: httpStatus.UNAUTHORIZED,
    });
  }
  const q = getQuery(event);
  const perPage = parseInt(q.perPage as string, 10) || 10; // default to 10 per page
  const page = parseInt(q.page as string, 10) || 0; // default to page 0

  const totalExpenses = await Expense.countDocuments();

  const expenses = await Expense.find({ user: session.user._id })
    .limit(perPage)
    .skip(perPage * page)
    .sort({
      name: "asc",
    });

  return {
    expenses,
    pagination: {
      total: totalExpenses,
      perPage,
      currentPage: page,
      totalPages: Math.ceil(totalExpenses / perPage),
    },
  };
});
