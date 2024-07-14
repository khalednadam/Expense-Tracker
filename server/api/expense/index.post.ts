import { getServerSession, getToken } from "#auth";
import { Expense } from "../models/expense.model";
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: "unauthenticated!" };
  }
  const body = await readBody(event);
  const expense = await Expense.create({ ...body, user: session.user._id });
  if (session.user !== undefined) {
    console.log("session: ", session.user._id);
  }
  return {
    uid: session.user._id,
  };
});
