import Prestasi from "../models/Prestasi.js";
import PrestasiRepository from "../repository/prestasiRepository.js";

export default class PrestasiService {
  constructor() {
    this.repo = new PrestasiRepository();
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async getById(id) {
    return await this.repo.getById(id);
  }

  async create(data) {
    if (!data.nama || !data.judul) {
      throw new Error("Nama dan Judul wajib diisi");
    }

    const prestasi = new Prestasi(
      null,
      data.juara,
      data.nama,
      data.kelas,
      data.judul,
      data.deskripsi,
      data.foto_url,
      data.author_id
    );

    return await this.repo.create(prestasi);
  }

  async update(id, data) {
    return await this.repo.update(id, data);
  }

  async delete(id) {
    await this.repo.delete(id);
  }
}
