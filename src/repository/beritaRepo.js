import dsn from "../infra/postgres.js";

const beritaRepository = {
  async getAll() {
    const result = await dsn.query(`
      SELECT b.*, u.username 
      FROM berita b
      JOIN users u ON b.user_id = u.id
      ORDER BY b.id DESC
    `);
    return result.rows;
  },

  async getById(id) {
    const result = await dsn.query(`
      SELECT b.*, u.username 
      FROM berita b
      JOIN users u ON b.user_id = u.id
      WHERE b.id = $1
    `, [id]);
    return result.rows[0];
  },

  async create({ foto, judul, tgl, deskripsi, user_id }) {
    const result = await dsn.query(`
      INSERT INTO berita (foto, judul, tgl, deskripsi, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [foto, judul, tgl, deskripsi, user_id]);
    return result.rows[0];
  },

  async update(id, { foto, judul, tgl, deskripsi }) {
    const result = await dsn.query(`
      UPDATE berita SET foto=$1, judul=$2, tgl=$3, deskripsi=$4 WHERE id=$5 RETURNING *
    `, [foto, judul, tgl, deskripsi, id]);
    return result.rows[0];
  },

  async delete(id) {
    await dsn.query(`DELETE FROM berita WHERE id=$1`, [id]);
  }
};

export default beritaRepository;
