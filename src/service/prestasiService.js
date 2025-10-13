import Prestasi from "../model/prestasiModel.js"; // Asumsi model ada; jika tidak, hapus dan gunakan plain object
import PrestasiRepository from "../repository/prestasiRepository.js";
import userService from "./userService.js"; // Asumsi ini return global.loggedUser

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

    // Ambil user yang sedang login (via global dari userService)
    const user = await userService.getLoggedUser();
    if (!user || !user.id) {
      throw new Error("User belum login!");
    }

    // Buat instance model jika ada; jika tidak, gunakan plain object
    const prestasiData = new Prestasi(
      null,
      data.juara || null,
      data.nama,
      data.kelas || null,
      data.judul,
      data.deskripsi || null,
      data.foto_url || null,
      user.id
    );

    // Jika model tidak return object plain, convert ke plain
    const plainData = prestasiData.toJSON ? prestasiData.toJSON() : prestasiData;

    return await this.repo.create(plainData);
  }

  async update(id, data) {
    const existing = await this.repo.getById(id);
    if (!existing) {
      throw new Error("Prestasi tidak ditemukan");
    }

    // Cek auth: hanya author yang boleh update
    const user = await userService.getLoggedUser();
    if (!user || existing.author_id !== user.id) {
      throw new Error("Forbidden");
    }

    // Update hanya field yang diberikan; fallback ke existing
    const updateData = {
      juara: data.juara !== undefined ? data.juara : existing.juara,
      nama: data.nama !== undefined ? data.nama : existing.nama,
      kelas: data.kelas !== undefined ? data.kelas : existing.kelas,
      judul: data.judul !== undefined ? data.judul : existing.judul,
      deskripsi: data.deskripsi !== undefined ? data.deskripsi : existing.deskripsi,
      foto_url: data.foto_url !== undefined ? data.foto_url : existing.foto_url
    };

    const updated = await this.repo.update(id, updateData);
    if (!updated) {
      throw new Error("Gagal update prestasi");
    }
    return updated;
  }

  async delete(id) {
    const existing = await this.repo.getById(id);
    if (!existing) {
      throw new Error("Prestasi tidak ditemukan");
    }

    // Cek auth: hanya author yang boleh delete
    const user = await userService.getLoggedUser();
    if (!user || existing.author_id !== user.id) {
      throw new Error("Forbidden");
    }

    const deleted = await this.repo.delete(id);
    if (!deleted) {
      throw new Error("Gagal menghapus prestasi");
    }
    return true;
  }
}