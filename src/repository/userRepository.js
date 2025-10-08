import dsn from "../infra/postgres.js";

const userRepository = {
  async createUser(username, password) {
    const result = await dsn`
      INSERT INTO users (username, password)
      VALUES (${username}, ${password})
      RETURNING id, username
    `;
    return result[0]; // hasil baris pertama
  },

  async getUserByUsername(username) {
    const result = await dsn`
      SELECT * FROM users WHERE username = ${username}
    `;
    return result[0] || null;
  },

  async getAll() {
    const result = await dsn`
      SELECT id, username FROM users
    `;
    return result;
  },

  async getById(id) {
    const result = await dsn`
      SELECT id, username FROM users WHERE id = ${id}
    `;
    return result[0] || null;
  },

  async update(id, username, password) {
    const result = await dsn`
      UPDATE users 
      SET username = ${username}, password = ${password} 
      WHERE id = ${id}
      RETURNING id, username
    `;
    return result[0] || null;
  },

  async delete(id) {
    await dsn`
      DELETE FROM users WHERE id = ${id}
    `;
  }
};

export default userRepository;
