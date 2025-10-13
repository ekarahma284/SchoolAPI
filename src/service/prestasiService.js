import Prestasi from "../model/prestasiModel.js";
import PrestasiRepository from "../repository/prestasiRepository.js";

export default class PrestasiService {
  constructor() {
    this.repo = new PrestasiRepository();
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async getById(id) {
    const data = await this.repo.getById(id);
    if (!data) throw new Error("Prestasi tidak ditemukan");
    return data;
  }

  async create(data) {
    // Validasi wajib
    if (!data.nama || !data.judul) {
      throw new Error("Nama dan Judul wajib diisi");
    }

    // Karena belum pakai login, pakai author_id default 1
    const prestasiData = new Prestasi(
      null,
      data.juara || null,
      data.nama,
      data.kelas || null,
      data.judul,
      data.deskripsi || null,
      data.foto_url || null,
      1 // default author_id
    );

    const plainData = prestasiData.toJSON ? prestasiData.toJSON() : prestasiData;
    const result = await this.repo.create(plainData);
    return result;
  }

  async update(id, data) {
    const existing = await this.repo.getById(id);
    if (!existing) throw new Error("Prestasi tidak ditemukan");

    const updateData = {
      juara: data.juara ?? existing.juara,
      nama: data.nama ?? existing.nama,
      kelas: data.kelas ?? existing.kelas,
      judul: data.judul ?? existing.judul,
      deskripsi: data.deskripsi ?? existing.deskripsi,
      foto_url: data.foto_url ?? existing.foto_url,
      author_id: existing.author_id,
    };

    const updated = await this.repo.update(id, updateData);
    if (!updated) throw new Error("Gagal update prestasi");
    return updated;
  }

  async delete(id) {
    const existing = await this.repo.getById(id);
    if (!existing) throw new Error("Prestasi tidak ditemukan");

    const deleted = await this.repo.delete(id);
    if (!deleted) throw new Error("Gagal menghapus prestasi");
    return true;
  }
}
