// models/User.ts
import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose, { Document, Model, Schema } from "mongoose";
import slugify from "slugify";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  slug: string;
}

interface IUserModel extends Model<IUser> {
  isEmailTaken(email: string, excludedUserId?: string): Promise<boolean>;
}

const user = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    private: true,
    unique: false,
  },
  slug: {
    type: String,
  },
});

user.pre("save", function (next) {
  if (this.isNew || this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
  next();
});

user.statics.isEmailTaken = async function (
  email: string,
  excludedUserId?: string
): Promise<boolean> {
  const user = await this.findOne({
    email,
    _id: { $ne: excludedUserId },
  });
  return !!user;
};

export const User = mongoose.model<IUser, IUserModel>("User", user);
