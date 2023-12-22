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
  },
  { timestamps: true }
);

const Team = mongoose?.models?.Team || mongoose.model("Team", TagSchema);
export default Team;
