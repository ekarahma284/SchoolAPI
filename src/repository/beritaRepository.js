import dsn from "../infra/postgres.js";

const beritaRepository = {
  async getAll() {
    const result = await dsn`
      SELECT b.*, u.username 
      FROM berita b
      JOIN users u ON b.author_id = u.id
      ORDER BY b.id DESC
    `;
    return result;
  },

  async getById(id) {
    const result = await dsn`
      SELECT b.*, u.username 
      FROM berita b
      JOIN users u ON b.author_id = u.id
      WHERE b.id = ${id}
    `;
    return result[0] || null;
  },

  async create({ foto_url, judul, tanggal, deskripsi, author_id }) {
    const result = await dsn`
      INSERT INTO berita (foto_url, judul, tanggal, deskripsi, author_id)
      VALUES (${foto_url}, ${judul}, ${tanggal}, ${deskripsi}, ${author_id})
      RETURNING *
    `;
    return result[0];
  },

  async update(id, { foto_url, judul, tanggal, deskripsi }) {
    const result = await dsn`
      UPDATE berita
      SET foto_url = ${foto_url}, judul = ${judul}, tanggal = ${tanggal}, deskripsi = ${deskripsi}
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0];
  },

  async delete(id) {
    await dsn`DELETE FROM berita WHERE id = ${id}`;
  }
};

export default beritaRepository;
