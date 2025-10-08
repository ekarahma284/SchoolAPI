import dsn from "../infra/postgres.js";

const pengumumanRepository = {
  async getAll() {
    const result = await dsn.query(`
      SELECT p.*, u.username
      FROM pengumuman p
      JOIN users u ON p.author_id = u.id
      ORDER BY p.id DESC
    `);
    return result.rows;
  },

  async getById(id) {
    const result = await dsn.query(`
      SELECT p.*, u.username
      FROM pengumuman p
      JOIN users u ON p.author_id = u.id
      WHERE p.id = $1
    `, [id]);
    return result.rows[0];
  },

  async create({ tanggal, judul, isi, author_id }) {
    const result = await dsn.query(`
      INSERT INTO pengumuman (tanggal, judul, isi, author_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [tanggal, judul, isi, author_id]);
    return result.rows[0];
  },

  async update(id, { tanggal, judul, isi }) {
    const result = await dsn.query(`
      UPDATE pengumuman
      SET tanggal = $1, judul = $2, isi = $3
      WHERE id = $4
      RETURNING *
    `, [tanggal, judul, isi, id]);
    return result.rows[0];
  },

  async delete(id) {
    await dsn.query(`DELETE FROM pengumuman WHERE id = $1`, [id]);
  }
};

export default pengumumanRepository;
