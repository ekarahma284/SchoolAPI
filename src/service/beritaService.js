import beritaRepository from "../Repository/beritaRepository.js";
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

    const user = userService.getLoggedUser(); // ambil author_id otomatis
    data.author_id = user.id;

    await beritaRepository.create(data);
  },

  async update(id, data) {
    await beritaRepository.update(id, data);
  },

  async delete(id) {
    await beritaRepository.delete(id);
  },
};

export default beritaService;
