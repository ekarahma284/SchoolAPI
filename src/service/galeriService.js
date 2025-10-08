import galeriRepository from "../repository/galeriRepository.js";
import userService from "./userService.js";

const galeriService = {
  async getAll() {
    return await galeriRepository.getAll();
  },

  async getById(id) {
    const row = await galeriRepository.getById(id);
    if (!row) throw new Error("Galeri tidak ditemukan");
    return row;
  },

  async create(data) {
    if (!data.foto_url || !data.judul)
      throw new Error("foto_url dan judul wajib diisi");

    const user = userService.getLoggedUser();
    data.author_id = user.id;

    return await galeriRepository.create(data);
  },

  async update(id, data) {
    if (!data.foto_url && !data.judul)
      throw new Error("Tidak ada data untuk diupdate");
    return await galeriRepository.update(id, data);
  },

  async delete(id) {
    return await galeriRepository.delete(id);
  },
};

export default galeriService;
