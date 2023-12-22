import mongoose from "mongoose";

const { Schema } = mongoose;

const Category = new Schema(
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
  },
  { timestamps: true }
);

const Team = mongoose?.models?.Team || mongoose.model("Team", Category);
export default Team;
