import { defineMongooseModel } from "#nuxt/mongoose";
import slugify from "slugify";

export const UserSchema = defineMongooseModel({
  name: "User",
  schema: {
    name: {
      type: "string",
      required: true,
      trim: true,
      unique: false,
    },
    email: {
      type: "string",
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: "string",
      trim: true,
      minlength: 8,
      private: true,
      unique: false,
    },
    slug: {
      type: "string",
    },
  },
  hooks(schema) {
    schema.pre("save", function (next: any) {
      if (this.isNew || this.isModified("name")) {
        this.slug = slugify(this.name, {
          lower: true,
          strict: true,
        }) as any;
      }
      next();
    });
  },
});
