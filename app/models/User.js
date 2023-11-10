import mongoose from "mongoose";

const { Schema } = mongoose;

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
  },
  { timestamps: true }
);

// const userModal =;
const User = mongoose?.models?.User || mongoose.model("User", UserSchema);
// export default mongoose.model("Blog", blogSchema);
export default User;
