import User from "../models/user.js";
import { signInValid, signUpValid } from "../validation/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { error } = signUpValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    user.password = undefined;
    return res.status(200).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signInValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ id: user.id }, "hoangteo", { expiresIn: "1d" });
    user.password = undefined;
    return res.status(200).json({
      message: "User logged in successfully",
      user: user,
      accessToken: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
