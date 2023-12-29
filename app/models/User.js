import mongoose from "mongoose";

const { Schema } = mongoose;

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      // unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },

    slug: String,
  }
  // { _id: false }
);
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      // unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    slug: String,
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
    },
    category: {
      type: [CategorySchema],
    },
    domain: String,
    name: String,
    role: String,
    firstName:String,
    lastName:String,
    teamId: {
      type: mongoose.Schema.ObjectId,
      ref: "Team",
   
    },
  },
  { timestamps: true }
);
const User = mongoose?.models?.User || mongoose.model("User", UserSchema);
export default User;
