import bcrypt from "bcrypt"
import { UserSchema } from "../models/user.model"
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const hashedPassword = await bcrypt.hash(body.password, 10)
  const user = await UserSchema.create({ ...body, password: hashedPassword })
  return { ...user.toObject(), password: undefined }
})
