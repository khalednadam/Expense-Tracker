import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const user = new Schema(
  {
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
    profilePicUrl: {
      type: String,
      default: null,
    },
    totalBalance: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "$",
      enum: ["$", "€", "₺", "﷼", "¥"],
    },
    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

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

export const UserScheme = mongoose.model("User", user);
