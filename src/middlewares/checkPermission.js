// B1: Kiểm tra xem user đã đăng nhập hay chưa?
// B2: Kiểm tra xem token có hợp lệ hay không? (có đúng không? còn thời gian sử dụng không?)
// B3: Giải mã token và kiểm tra quyền của user (user.role)
// B4: Nếu là admin thì cấp quyền admin, nếu không phải admin thì từ chối hành động.

import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const checkPermission = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        // message: 'Authorization header is required'
        message: "Bạn chưa đăng nhập",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    // ["Bearer", "1234567890asd..."]
    jwt.verify(token, "hoangteo", async (error, payload) => {
      if (error) {
        if (error.name === "JsonWebTokenError") {
          return res.status(401).json({
            message: "Token không hợp lệ",
          });
        }
        if (error.name === "TokenExpiredError") {
          return res.status(401).json({
            message: "Token hết hạn",
          });
        }

        if (error.name === "NotBeforeError") {
          return res.status(401).json({
            message: "Token không hoạt động",
          });
        }
      }
      if (payload) {
        const user = await User.findById(payload.id);
        if (!user) {
          return res.status(401).json({
            message: "User không tồn tại",
          });
        }
        if (user.role !== "admin") {
          return res.status(401).json({
            message: "Bạn không có quyền admin",
          });
        }
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
