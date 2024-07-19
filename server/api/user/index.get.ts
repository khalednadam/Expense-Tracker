import { getServerSession } from "#auth";
import httpStatus from "http-status";
import { UserScheme } from "../models/user.model";
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({
      message: "You are unauthenticated!",
      statusCode: httpStatus.UNAUTHORIZED,
    });
  }

  const data = await UserScheme.findById(session.user._id);

  return {
    data,
  };
});
