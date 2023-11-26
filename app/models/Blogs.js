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
    seo: {
      metaTitle: String,
      metaDescription: String,
      cononical: String,
      slug: String,
      category:mongoose.Schema.Types.Mixed,
      tags: [],
    },
    // seo: mongoose.Schema.Types.Mixed,
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
