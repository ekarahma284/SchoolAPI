import Prestasi from "../model/prestasiModel.js";
import PrestasiRepository from "../repository/prestasiRepository.js";
import userService from "./userService.js";

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

    // Ambil user yang sedang login
    const user = await userService.getLoggedUser();
    if (!user || !user.id) {
      throw new Error("User belum login!");
    }

    const prestasi = new Prestasi(
      null,
      data.juara || null,
      data.nama,
      data.kelas || null,
      data.judul,
      data.deskripsi || null,
      data.foto_url || null,
      user.id
    );

    return await this.repo.create(prestasi);
  }

  async update(id, data) {
    const cekPrestasi = await this.repo.getById(id);
    if (!cekPrestasi) {
      throw new Error("Prestasi tidak ditemukan");
    }

    const updateData = {
      juara: data.juara !== undefined ? data.juara : cekPrestasi.juara,
      nama: data.nama || cekPrestasi.nama,
      kelas: data.kelas !== undefined ? data.kelas : cekPrestasi.kelas,
      judul: data.judul || cekPrestasi.judul,
      deskripsi: data.deskripsi !== undefined ? data.deskripsi : cekPrestasi.deskripsi,
      foto_url: data.foto_url !== undefined ? data.foto_url : cekPrestasi.foto_url
    };

    return await this.repo.update(id, updateData);
  }

  async delete(id) {
    const cekPrestasi = await this.repo.getById(id);
    if (!cekPrestasi) {
      throw new Error("Prestasi tidak ditemukan");
    }
    await this.repo.delete(id);
  }
}