import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    writtenBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    html: String,
    stats: Object,
    title:String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("Blog", blogSchema);
