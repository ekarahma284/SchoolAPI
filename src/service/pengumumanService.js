import userService from "./userService.js";
import pengumumanRepository from "../repository/pengumumanRepository.js"

const pengumumanService = {
  async getAll() {
    return await pengumumanRepository.getAll();
  },

  async getById(id) {
    const row = await pengumumanRepository.getById(id);
    if (!row) throw new Error("Pengumuman tidak ditemukan");
    return row;
  },

  async create(data) {
    if (!data.tanggal || !data.judul || !data.isi)
      throw new Error("tanggal, judul, dan isi wajib diisi");

    const user = userService.getLoggedUser();
    data.author_id = user.id;

    return await pengumumanRepository.create(data);
  },

  async update(id, data) {
    if (!data.tanggal && !data.judul && !data.isi)
      throw new Error("Tidak ada data untuk diupdate");
    return await pengumumanRepository.update(id, data);
  },

  async delete(id) {
    return await pengumumanRepository.delete(id);
  },
};

export default pengumumanService;
