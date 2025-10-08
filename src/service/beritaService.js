import beritaRepo from "../repository/beritaRepo.js";
import userService from "./userService.js";

const beritaService = {
  async getAll() {
    return await beritaRepo.getAll();
  },

  async getById(id) {
    const data = await beritaRepo.getById(id);
    if (!data) throw new Error("Berita tidak ditemukan!");
    return data;
  },

  async create(data) {
    if (!data.judul || !data.deskripsi) throw new Error("Judul dan deskripsi wajib diisi!");

    const user = await userService.getLoggedUser(); // ambil author_id otomatis
    data.author_id = user.id;

    await beritaRepo.create(data);
  },

  async update(id, data) {
    await beritaRepo.update(id, data);
  },

  async delete(id) {
    await beritaRepo.delete(id);
  },
};

export default beritaService;
