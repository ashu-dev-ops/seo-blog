import mongoose from "mongoose";

const { Schema } = mongoose;

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    username: String,
  }
  // { _id: false }
);
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  }
  // { _id: false }
);

CategorySchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});
const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    siteDetails: Object,
    tags: {
      type: [TagSchema],
      default: [],
    },
    category: {
      type: [CategorySchema],
      default: [],
    },
  },
  { timestamps: true }
);
const User = mongoose?.models?.User || mongoose.model("User", UserSchema);
export default User;
