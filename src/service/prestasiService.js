import prestasiRepository from "../repository/prestasiRepository.js";
import userService from "./userService.js";

const prestasiService = {
  async getAll() {
    return await prestasiRepository.getAll();
  },

  async getById(id) {
    const row = await prestasiRepository.getById(id);
    if (!row) throw new Error("Prestasi tidak ditemukan");
    return row;
  },

  async create(data) {
    // Pastikan body tidak kosong
    if (!data || !data.nama || !data.judul)
      throw new Error("Nama dan Judul wajib diisi");

    // Coba ambil user login, kalau belum login pakai default author_id = 1
    const user = userService.getLoggedUser?.() || { id: 1 };
    data.author_id = data.author_id || user.id;

    // Simpan ke repository
    const result = await prestasiRepository.create(data);
    return result;
  },

  async update(id, data) {
    if (!data.judul && !data.nama && !data.juara)
      throw new Error("Tidak ada data untuk diperbarui");
    return await prestasiRepository.update(id, data);
  },

  async delete(id) {
    return await prestasiRepository.delete(id);
  },
};

export default prestasiService;
