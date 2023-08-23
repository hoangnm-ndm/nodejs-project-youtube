import cloudinary from "../configs/cloudinaryConfig";

export const uploadImages = async (req, res) => {
  try {
    const images = req.files.map((file) => file.path);

    const uploadedImages = [];

    for (let image of images) {
      const results = await cloudinary.uploader.upload(image);
      console.log(results);
      uploadedImages.push({
        url: results.secure_url,
        publicId: results.public_id,
      });
    }
    return res.status(200).json({
      message: "Uploaded images successfully!",
      datas: uploadedImages,
    });
  } catch (error) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const removeImages = async (req, res) => {
  try {
    const publicId = req.params.publicId;
    const results = await cloudinary.uploader.destroy(publicId);
    console.log(results);
    if (results.result === "not found") {
      throw new Error("Delete images failed!");
    }

    return res.status(200).json({
      message: "Delete image successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
};
