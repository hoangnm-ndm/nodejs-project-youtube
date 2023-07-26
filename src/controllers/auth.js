import User from "../models/User"
import bcryptjs from "bcryptjs"
import { signUpValidator } from "../validation/user"
export const signUp = async (req, res) => {
    try {
        // Bước 1: Validate dữ liệu người dùng.
        const { error } = signUpValidator.validate(req.body, { abortEarly: false})
        if(error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                message: errors
            })            
        }

        // throw new Error("Gửi ra một thông điệp lỗi!")
        // Bước 2: Kiểm tra xem email đã tồn tại trong hệ thống hay chưa?
        const userExists = await User.findOne({ email: req.body.email})
        if(userExists) {
            return res.status(400).json({
                message: "Email này đã được đăng ký, bạn có muốn đăng nhập không?"
            })
        }

        // Bước 3: Mã hoá password
        const hashedPassword = await bcryptjs.hash(req.body.password, 10)


        // Bước 4: Khởi tạo user trong db
        const user = await User.create({
            ...req.body,
            password: hashedPassword
        })
        // Bước 5: Thông báo cho người dùng đăng ký thành công.
        // Xoá mật khẩu đi
        user.password = undefined
        return res.status(200).json({
            message: "Đăng ký account thành công!",
            user
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}
