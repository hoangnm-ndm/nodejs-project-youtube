import mongoose from "mongoose";

const productSchema = new mongoose.Schema({ name: String, price: Number });
// Tạo ra một model tên là Product
export default mongoose.model("Product", productSchema);
