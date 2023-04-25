import Product from "../models/product.js";

export const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({
        message: "Khong tim thay san pham",
      });
    }
    return res.status(200).json({
      message: "Lay danh sach san pham thanh cong",
      datas: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Khong tim thay san pham",
      });
    }
    return res.status(200).json({
      message: "Lay san pham thanh cong",
      datas: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const create = (req, res) => {
  res.send("Tao san pham thanh cong");
};

export const update = (req, res) => {
  res.send("Cap nhat san pham thanh cong");
};

export const remove = (req, res) => {
  res.send("Xoa san pham thanh cong");
};
