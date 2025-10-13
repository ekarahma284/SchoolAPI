import dsn from "../infra/postgres.js";

export default class PrestasiRepository {
  static async getAll() {
    const result = await dsn`
      SELECT p.*, u.username
      FROM prestasi p
      LEFT JOIN users u ON p.author_id = u.id
      ORDER BY p.id DESC
    `;
    return result;
  }

  static async getById(id) {
    const result = await dsn`
      SELECT p.*, u.username
      FROM prestasi p
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.id = ${id}
    `;
    return result[0] || null;
  }

  static async create(prestasi) {
    const result = await dsn`
      INSERT INTO prestasi (juara, nama, kelas, judul, deskripsi, foto_url, author_id)
      VALUES (
        ${prestasi.juara},
        ${prestasi.nama},
        ${prestasi.kelas},
        ${prestasi.judul},
        ${prestasi.deskripsi},
        ${prestasi.foto_url},
        ${prestasi.author_id}
      )
      RETURNING *
    `;
    return result[0];
  }

  static async update(id, prestasi) {
    const result = await dsn`
      UPDATE prestasi
      SET
        juara = ${prestasi.juara},
        nama = ${prestasi.nama},
        kelas = ${prestasi.kelas},
        judul = ${prestasi.judul},
        deskripsi = ${prestasi.deskripsi},
        foto_url = ${prestasi.foto_url},
        author_id = ${prestasi.author_id}
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0] || null;
  }

  static async delete(id) {
    const result = await dsn`
      DELETE FROM prestasi WHERE id = ${id} RETURNING *
    `;
    return result.length > 0;
  }
}