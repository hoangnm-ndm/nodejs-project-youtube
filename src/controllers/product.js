import Product from "../models/Product.js";
import { productValid } from "../validation/product.js";

export const getList = async (req, res) => {
  try {
    // const data = await Product.find();
    const {
      _page = 1,
      _limit = 10,
      _sort = "createdAt",
      _order = "asc",
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "asc" ? 1 : -1,
      },
    };

    const data = await Product.paginate({}, options);
    console.log(data);
    if (!data.docs || data.docs.length === 0) {
      return res.status(404).json({
        message: "Khong tim thay san pham",
      });
    }
    return res.status(200).json({
      message: "Lay danh sach san pham thanh cong",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.name,
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
      message: error.name,
      message: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = productValid.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const product = await Product.create(req.body);
    if (!product) {
      return res.status(404).json({
        message: "Tao san pham khong thanh cong",
      });
    }
    return res.status(200).json({
      message: "Tao san pham thanh cong",
      datas: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.name,
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = productValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({
        message: "Cap nhat san pham khong thanh cong",
      });
    }
    return res.status(200).json({
      message: "Cap nhat san pham thanh cong",
      datas: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.name,
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(400).json({
        message: "Xoa san pham khong thanh cong!",
      });
    }
    return res.status(200).json({
      message: "Xoa san pham thanh cong!",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.name,
      message: error,
    });
  }
};
