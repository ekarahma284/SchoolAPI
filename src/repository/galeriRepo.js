import dsn from "../infra/postgres.js";

const galeriRepository = {
  async getAll() {
    const result = await dsn.query(`
      SELECT g.*, u.username
      FROM galeri g
      JOIN users u ON g.author_id = u.id
      ORDER BY g.id DESC
    `);
    return result.rows;
  },

  async getById(id) {
    const result = await dsn.query(`
      SELECT g.*, u.username
      FROM galeri g
      JOIN users u ON g.author_id = u.id
      WHERE g.id = $1
    `, [id]);
    return result.rows[0];
  },

  async create({ foto_url, judul, author_id }) {
    const result = await dsn.query(`
      INSERT INTO galeri (foto_url, judul, author_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [foto_url, judul, author_id]);
    return result.rows[0];
  },

  async update(id, { foto_url, judul }) {
    const result = await dsn.query(`
      UPDATE galeri
      SET foto_url = $1, judul = $2
      WHERE id = $3
      RETURNING *
    `, [foto_url, judul, id]);
    return result.rows[0];
  },

  async delete(id) {
    await dsn.query(`DELETE FROM galeri WHERE id = $1`, [id]);
  }
};

export default galeriRepository;
