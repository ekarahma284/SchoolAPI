import dsn from "../infra/postgres.js";

const pengumumanRepository = {
  async getAll() {
    const result = await dsn`
      SELECT p.*, u.username
      FROM pengumuman p
      JOIN users u ON p.author_id = u.id
      ORDER BY p.id DESC
    `;
    return result;
  },

  async getById(id) {
    const result = await dsn`
      SELECT p.*, u.username
      FROM pengumuman p
      JOIN users u ON p.author_id = u.id
      WHERE p.id = ${id}
    `;
    return result[0] || null;
  },

  async create({ tanggal, judul, isi, author_id }) {
    const result = await dsn`
      INSERT INTO pengumuman (tanggal, judul, isi, author_id)
      VALUES (${tanggal}, ${judul}, ${isi}, ${author_id})
      RETURNING *
    `;
    return result[0];
  },

  async update(id, { tanggal, judul, isi }) {
    const result = await dsn`
      UPDATE pengumuman
      SET tanggal = ${tanggal}, judul = ${judul}, isi = ${isi}
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0];
  },

  async delete(id) {
    await dsn`DELETE FROM pengumuman WHERE id = ${id}`;
  }
};

export default pengumumanRepository;
