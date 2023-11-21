import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
dotenv.config();

const { SECRET_CODE } = process.env;

export const checkPermisson = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({
        message: "Bạn chưa đăng nhập!",
      });
    }
    const decoded = jwt.verify(token, SECRET_CODE);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(403).json({
        message: "Token lỗi!",
      });
    }

    if (user.role !== "admin") {
      return res.status(400).json({
        message: "Bạn không có quyền làm việc này!",
      });
    }
    next();
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
