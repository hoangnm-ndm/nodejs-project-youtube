export const createUser = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: error.name,
      message: error,
    });
  }
};
