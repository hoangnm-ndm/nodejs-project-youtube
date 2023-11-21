import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
dotenv.config();

const { SECRET_CODE } = process.env;

export const checkisAdmin = async (req, res, next) => {
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

    req.user = user;
    next();
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};

export const checkAdminLastest = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(400).json({
        message: "Bạn không có quyền làm việc này!",
      });
    }

    const userAdminCount = await User.countDocuments({ role: "admin" });
    console.log("userAdminCount", userAdminCount);
    if (userAdminCount === 1) {
      return res.status(400).json({
        message: "Bạn không thể xóa tài khoản admin cuối cùng!",
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
