import User from "../models/user.js";
import { userValid } from "../validation/user.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { error } = userValid.validate(req.body, { abortEarly: false });
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
