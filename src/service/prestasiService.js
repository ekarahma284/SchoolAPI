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
    // minimal validation
    if (!data.nama || !data.judul) throw new Error("nama dan judul wajib diisi");

    const user = await userService.getLoggedUser();
    data.author_id = user.id;

    return await prestasiRepository.create(data);
  },

  async update(id, data) {
    if (!data.judul && !data.nama && !data.juara) throw new Error("Tidak ada data untuk diupdate");
    return await prestasiRepository.update(id, data);
  },

  async delete(id) {
    return await prestasiRepository.delete(id);
  }
};

export default prestasiService;
