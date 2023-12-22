import mongoose from "mongoose";

const { Schema } = mongoose;
const TeamsTagSchema = new Schema(
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
    by: { type: mongoose.Schema.ObjectId, ref: "User", required: true },

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
    by: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  }
  // { _id: false }
);

CategorySchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});
const TeamSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        memberId: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
          id: false,
        },
      },
    ],
    tags: [TeamsTagSchema],
    category: [CategorySchema],
  },
  { timestamps: true }
);

const Team = mongoose?.models?.Team || mongoose.model("Team", TeamSchema);
export default Team;
