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
    const prestasi = await this.repo.getById(id);
    if (!prestasi) {
      throw new Error("Prestasi tidak ditemukan");
    }
    return prestasi;
  }

  async create(data) {
    if (!data.nama || !data.judul) {
      throw new Error("Nama dan Judul wajib diisi");
    }

    // Tidak pakai login check
    const prestasiData = new Prestasi(
      null,
      data.juara || null,
      data.nama,
      data.kelas || null,
      data.judul,
      data.deskripsi || null,
      data.foto_url || null,
      data.author_id || 1 // default author_id
    );

    const plainData = prestasiData.toJSON ? prestasiData.toJSON() : prestasiData;
    return await this.repo.create(plainData);
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
      author_id: existing.author_id || 1,
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
