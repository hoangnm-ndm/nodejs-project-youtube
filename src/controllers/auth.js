import User from "../models/User";
import bcryptjs from "bcryptjs";
import { signInValidator, signUpValidator } from "../validation/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { SECRET_CODE } = process.env;
export const signUp = async (req, res) => {
  try {
    // Bước 1: Validate dữ liệu người dùng.
    const { error } = signUpValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        message: "Email này đã được đăng ký, bạn có muốn đăng nhập không?",
      });
    }
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng ký account thành công!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { error } = signInValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "Email này chưa được đăng ký, bạn có muốn đăng ký không?",
      });
    }

    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không đúng!",
      });
    }

    const accessToken = jwt.sign({ _id: user._id }, SECRET_CODE, {
      expiresIn: "1d",
    });

    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công!",
      user,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
