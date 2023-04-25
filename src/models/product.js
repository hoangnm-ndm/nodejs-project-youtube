import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minLength: 3,
    },
    price: {
      type: Number,
      require: true,
      minLength: 1,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// Tạo ra một model tên là Product
export default mongoose.model("Product", productSchema);
