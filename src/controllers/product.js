import Product from "../models/product.js";

export const getAll = async (req, res) => {
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
};

export const getDetail = (req, res) => {
  const product = products.find((product) => {
    return product.id === req.params.id;
  });
  res.send(product);
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
