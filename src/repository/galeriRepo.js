import dsn from "../infra/postgres.js";

const galeriRepo = {
  async getAll() {
    const result = await dsn.query("SELECT * FROM galeri ORDER BY id DESC");
    return result.rows;
  },

  async getById(id) {
    const result = await dsn.query("SELECT * FROM galeri WHERE id = $1", [id]);
    return result.rows[0];
  },

  async create(data) {
    const { foto_url, judul, author_id } = data;
    await dsn.query(
      "INSERT INTO galeri (foto_url, judul, author_id) VALUES ($1, $2, $3)",
      [foto_url, judul, author_id]
    );
  },

  async update(id, data) {
    const { foto_url, judul, author_id } = data;
    await dsn.query(
      "UPDATE users SET foto_url=$1, judul =$2, author_id = $3 WHERE id=$4",
      [foto_url, judul, author_id]
    );
  },

  async delete(id) {
    await dsn.query("DELETE FROM galeri WHERE id=$1", [id]);
  },
};

export default galeriRepo;