import uploadService from "../service/uploadService.js";

const uploadController = {
  async upload(req, res) {
    try {
      const file = req.file;
      const publicUrl = await uploadService.upload(file);

      res.status(200).json({
        message: "Upload berhasil",
        url: publicUrl,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
};

export default uploadController;
