import uploadRepository from "../repository/uploadRepository.js";

const uploadService = {
  async upload(file) {
    if (!file) {
      throw new Error("File tidak ditemukan");
    }

    // Validasi tipe file (opsional)
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(file.mimetype)) {
      throw new Error("Format file tidak didukung. Gunakan JPG atau PNG");
    }

    // Kirim ke repository
    const publicUrl = await uploadRepository.uploadFile(file);
    return publicUrl;
  }
};

export default uploadService;
