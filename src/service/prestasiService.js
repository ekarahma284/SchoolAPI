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
    if (!data.nama || !data.judul) {
      throw new Error("Nama dan Judul wajib diisi");
    }

    // sementara abaikan login user agar tidak Unauthorized
    const author_id = data.author_id || 1; // default user id 1 jika belum pakai login

    const prestasiData = new Prestasi(
      null,
      data.juara || null,
      data.nama,
      data.kelas || null,
      data.judul,
      data.deskripsi || null,
      data.foto_url || null,
      author_id
    );

    const plainData = prestasiData.toJSON ? prestasiData.toJSON() : prestasiData;
    return await this.repo.create(plainData);
  }

  async update(id, data) {
    const existing = await this.repo.getById(id);
    if (!existing) {
      throw new Error("Prestasi tidak ditemukan");
    }

    // hilangkan auth check sementara
    const updateData = {
      juara: data.juara ?? existing.juara,
      nama: data.nama ?? existing.nama,
      kelas: data.kelas ?? existing.kelas,
      judul: data.judul ?? existing.judul,
      deskripsi: data.deskripsi ?? existing.deskripsi,
      foto_url: data.foto_url ?? existing.foto_url,
    };

    const updated = await this.repo.update(id, updateData);
    if (!updated) throw new Error("Gagal update prestasi");
    return updated;
  }

  async delete(id) {
    const existing = await this.repo.getById(id);
    if (!existing) {
      throw new Error("Prestasi tidak ditemukan");
    }

    // hilangkan auth check sementara
    const deleted = await this.repo.delete(id);
    if (!deleted) throw new Error("Gagal menghapus prestasi");
    return true;
  }
}
