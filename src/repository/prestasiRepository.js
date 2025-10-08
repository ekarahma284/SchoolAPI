import dsn from "../infra/postgres.js";

const prestasiRepository = {
  async getAll() {
    const result = await dsn.query(`
      SELECT p.*, u.username
      FROM prestasi p
      JOIN users u ON p.author_id = u.id
      ORDER BY p.id DESC
    `);
    return result.rows;
  },

  async getById(id) {
    const result = await dsn.query(`
      SELECT p.*, u.username
      FROM prestasi p
      JOIN users u ON p.author_id = u.id
      WHERE p.id = $1
    `, [id]);
    return result.rows[0];
  },

  async create({ juara, nama, kelas, judul, deskripsi, foto_url, author_id }) {
    const result = await dsn.query(`
      INSERT INTO prestasi (juara, nama, kelas, judul, deskripsi, foto_url, author_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [juara, nama, kelas, judul, deskripsi, foto_url, author_id]);
    return result.rows[0];
  },

  async update(id, { juara, nama, kelas, judul, deskripsi, foto_url }) {
    const result = await dsn.query(`
      UPDATE prestasi
      SET juara=$1, nama=$2, kelas=$3, judul=$4, deskripsi=$5, foto_url=$6
      WHERE id=$7
      RETURNING *
    `, [juara, nama, kelas, judul, deskripsi, foto_url, id]);
    return result.rows[0];
  },

  async delete(id) {
    await dsn.query(`DELETE FROM prestasi WHERE id = $1`, [id]);
  }
};

export default prestasiRepository;
