import dsn from "../infra/postgres.js";

const prestasiRepository = {
  async getAll() {
    const result = await dsn`
      SELECT p.*, u.username 
      FROM prestasi p
      JOIN users u ON p.author_id = u.id
      ORDER BY p.id DESC
    `;
    return result;
  },

  async getById(id) {
    const result = await dsn`
      SELECT p.*, u.username 
      FROM prestasi p
      JOIN users u ON p.author_id = u.id
      WHERE p.id = ${id}
    `;
    return result[0] || null;
  },

  async create(prestasi) {
    const { juara, nama, kelas, judul, deskripsi, foto_url, author_id } = prestasi;
    const result = await dsn`
      INSERT INTO prestasi (juara, nama, kelas, judul, deskripsi, foto_url, author_id)
      VALUES (${juara}, ${nama}, ${kelas}, ${judul}, ${deskripsi}, ${foto_url}, ${author_id})
      RETURNING *
    `;
    return result[0];
  },

  async update(id, prestasi) {
    const { juara, nama, kelas, judul, deskripsi, foto_url } = prestasi;
    const result = await dsn`
      UPDATE prestasi
      SET juara=${juara}, nama=${nama}, kelas=${kelas}, judul=${judul},
          deskripsi=${deskripsi}, foto_url=${foto_url}
      WHERE id=${id}
      RETURNING *
    `;
    return result[0];
  },

  async delete(id) {
    await dsn`DELETE FROM prestasi WHERE id=${id}`;
  }
};

export default prestasiRepository;
