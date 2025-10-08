import dsn from "../infra/postgres.js";

const userRepository = {
  async createUser(username, password) {
    const query = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username`;
    const result = await dsn.query(query, [username, password]);
    return result.rows[0];
  },

  async getUserByUsername(username) {
    const result = await dsn.query(`SELECT * FROM users WHERE username = $1`, [username]);
    return result.rows[0];
  },

  async getAll() {
    const result = await dsn.query(`SELECT id, username FROM users`);
    return result.rows;
  },

  async getById(id) {
    const result = await dsn.query(`SELECT id, username FROM users WHERE id = $1`, [id]);
    return result.rows[0];
  },

  async update(id, username, password) {
    const result = await dsn.query(
      `UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING id, username`,
      [username, password, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    await dsn.query(`DELETE FROM users WHERE id = $1`, [id]);
  }
};

export default userRepository;
