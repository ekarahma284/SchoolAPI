import dsn from "../infra/postgres.js";

const prestasiRepo = {
  async getAll() {
    const result = await dsn.query("SELECT * FROM prestasi ORDER BY id DESC");
    return result.rows;
  },

  async getById(id) {
    const result = await dsn.query("SELECT * FROM prestasi WHERE id = $1", [id]);
    return result.rows[0];
  },

  async create(data) {
    const { juara, nama, kelas, judul, deskripsi, author_id, foto_url} = data;
    await dsn.query(
      "INSERT INTO prestasi (juara, nama, kelas, judul, deskripsi, author_id, foto_url) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [juara, nama, kelas, judul, deskripsi, author_id, foto_url]
    );
  },

  async update(id, data) {
    const { juara, nama, kelas, judul, deskripsi, author_id, foto_url } = data;
    await dsn.query(
      "UPDATE users SET juara=$1, nama =$2, kelas = $3, judul = $4, deskripsi =$5, author_id =$6, foto_url = $7 WHERE id=$8",
      [juara, nama, kelas, judul, deskripsi, author_id, foto_url]
    );
  },

  async delete(id) {
    await dsn.query("DELETE FROM prestasi WHERE id=$1", [id]);
  },
};

export default prestasiRepo;