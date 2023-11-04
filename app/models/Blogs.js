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
    seo:Object,
    blogStatus:String,
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
