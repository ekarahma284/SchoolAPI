import dsn from "../infra/postgres.js";

const beritaRepo = {
  async getAll() {
    const result = await dsn.query("SELECT * FROM berita ORDER BY id DESC");
    return result.rows;
  },

  async getById(id) {
    const result = await dsn.query("SELECT * FROM berita WHERE id = $1", [id]);
    return result.rows[0];
  },

  async create(data) {
    const { foto_url, judul, tanggal, deskripsi, author_id } = data;
    await dsn.query(
      "INSERT INTO berita (foto_url, judul, tanggal, deskripsi, author_id) VALUES ($1, $2, $3, $4, $5)",
      [foto_url, judul, tanggal, deskripsi, author_id]
    );
  },

  async update(id, data) {
    const { foto_url, judul, tanggal, deskripsi, author_id } = data;
    await dsn.query(
      "UPDATE berita SET foto_url=$1, judul=$2, tanggal=$3, deskripsi=$4, author_id=$5 WHERE id=$6",
      [foto_url, judul, tanggal, deskripsi, author_id, id]
    );
  },

  async delete(id) {
    await dsn.query("DELETE FROM berita WHERE id=$1", [id]);
  },
};

export default beritaRepo;
