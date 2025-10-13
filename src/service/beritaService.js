import beritaRepository from "../repository/beritaRepository.js";
import userService from "./userService.js";

const beritaService = {
  async getAll() {
    return await beritaRepository.getAll();
  },

  async getById(id) {
    const data = await beritaRepository.getById(id);
    if (!data) throw new Error("Berita tidak ditemukan!");
    return data;
  },

  async create(data) {
    if (!data.judul || !data.deskripsi)
      throw new Error("Judul dan deskripsi wajib diisi!");

    // ⚠️ Pastikan userService.getLoggedUser() benar-benar mengembalikan user
    const user = await userService.getLoggedUser();
    data.author_id = user?.id || null;

    // jika belum login, boleh tetap null
    const result = await beritaRepository.create(data);
    return result;
  },

  async update(id, data) {
    const cekBerita = await beritaRepository.getById(id);
    if (!cekBerita) {
      throw new Error("Berita tidak ditemukan");
    }
    return await beritaRepository.update(id, data);
  },

  async delete(id) {
    await beritaRepository.delete(id);
  },
};

export default beritaService;
