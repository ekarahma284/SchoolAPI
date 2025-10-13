import Prestasi from "../model/prestasiModel.js";
import prestasiRepository from "../repository/prestasiRepository.js";

const prestasiService = {
  async getAll() {
    return await prestasiRepository.getAll();
  },

  async getById(id) {
    const data = await prestasiRepository.getById(id);
    if (!data) throw new Error("Prestasi tidak ditemukan");
    return data;
  },

  async create(data) {
    // Validasi wajib isi
    if (!data.nama || !data.judul) {
      throw new Error("Nama dan Judul wajib diisi");
    }

    // Pastikan author_id ada
    const author_id = data.author_id || 1; // fallback sementara (admin)

    const prestasi = new Prestasi(
      null,
      data.juara,
      data.nama,
      data.kelas,
      data.judul,
      data.deskripsi,
      data.foto_url,
      author_id
    );

    return await prestasiRepository.create(prestasi);
  },

  async update(id, data) {
    const existing = await prestasiRepository.getById(id);
    if (!existing) throw new Error("Prestasi tidak ditemukan");

    const updated = new Prestasi(
      id,
      data.juara ?? existing.juara,
      data.nama ?? existing.nama,
      data.kelas ?? existing.kelas,
      data.judul ?? existing.judul,
      data.deskripsi ?? existing.deskripsi,
      data.foto_url ?? existing.foto_url,
      existing.author_id
    );

    return await prestasiRepository.update(id, updated);
  },

  async delete(id) {
    const existing = await prestasiRepository.getById(id);
    if (!existing) throw new Error("Prestasi tidak ditemukan");
    await prestasiRepository.delete(id);
  }
};

export default prestasiService;
