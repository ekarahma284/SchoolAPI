import dsn from "../infra/postgres.js";

const galeriRepository = {
  async getAll() {
    const result = await dsn`
      SELECT g.*, u.username
      FROM galeri g
      JOIN users u ON g.author_id = u.id
      ORDER BY g.id DESC
    `;
    return result;
  },

  async getById(id) {
    const result = await dsn`
      SELECT g.*, u.username
      FROM galeri g
      JOIN users u ON g.author_id = u.id
      WHERE g.id = ${id}
    `;
    return result[0] || null;
  },

  async create({ foto_url, judul, author_id }) {
    const result = await dsn`
      INSERT INTO galeri (foto_url, judul, author_id)
      VALUES (${foto_url}, ${judul}, ${author_id})
      RETURNING *
    `;
    return result[0];
  },

  async update(id, { foto_url, judul }) {
    const result = await dsn`
      UPDATE galeri
      SET foto_url = ${foto_url}, judul = ${judul}
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0];
  },

  async delete(id) {
    await dsn`DELETE FROM galeri WHERE id = ${id}`;
  }
};

export default galeriRepository;
