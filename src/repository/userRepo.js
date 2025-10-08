import dsn from "../infra/postgres.js";

const usersRepo = {
  async getAll() {
    const result = await dsn.query("SELECT * FROM users ORDER BY id DESC");
    return result.rows;
  },

  async getById(id) {
    const result = await dsn.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  async create(data) {
    const { username, password } = data;
    await dsn.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, password]
    );
  },

  async update(id, data) {
    const { username, password } = data;
    await dsn.query(
      "UPDATE users SET username=$1, password =$2 WHERE id=$3",
      [username, password]
    );
  },

  async delete(id) {
    await dsn.query("DELETE FROM users WHERE id=$1", [id]);
  },
};

export default usersRepo;