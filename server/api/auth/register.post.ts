import validator from "validator";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { UserScheme } from "../models/user.model";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.email) {
    throw createError({
      message: "Email is required",
      statusCode: httpStatus.BAD_REQUEST,
    });
  }

  if (!validator.isEmail(body.email)) {
    throw createError({
      message: "Please enter a valid email",
      statusCode: httpStatus.BAD_REQUEST,
    });
  }

  if (!body.password) {
    throw createError({
      message: "Password is required",
      statusCode: httpStatus.BAD_REQUEST,
    });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const user = await UserScheme.create({ ...body, password: hashedPassword });
  return {
    user: { ...user.toObject(), password: undefined },
    status: httpStatus.CREATED,
  };
});
