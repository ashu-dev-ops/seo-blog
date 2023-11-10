import mongoose from "mongoose";

const { Schema } = mongoose;

const BlogSchema = new Schema(
  {
    writtenBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    html: String,
    stats: Object,
    title: String,
    seo: Object,
    tableOfContentsId: [
      {
        headingTitle: String,
        headingId: String,
      },
    ],
    blogStatus: String,
  },
  { timestamps: true }
);

const Blog = mongoose?.models?.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;
