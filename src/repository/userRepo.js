import dsn from "../infra/postgres.js";

const userRepo = {
  async getAll() {
    const result = await dsn.query("SELECT id, username, password FROM users ORDER BY id");
    return result.rows;
  },

  async getById(id) {
    const result = await dsn.query("SELECT id, username, password FROM users WHERE id=$1", [id]);
    return result.rows[0];
  },

  async create(data) {
    await dsn.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      data.username,
      data.password,
    ]);
  },

  async update(id, data) {
    await dsn.query("UPDATE users SET username=$1, password=$2 WHERE id=$3", [
      data.username,
      data.password,
      id,
    ]);
  },

  async delete(id) {
    await dsn.query("DELETE FROM users WHERE id=$1", [id]);
  },

  // ======= REGISTER =======
  async register(username, password) {
    const check = await dsn.query("SELECT * FROM users WHERE username=$1", [username]);
    if (check.rows.length > 0) {
      throw new Error("Username sudah digunakan");
    }

    await dsn.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      password,
    ]);
    return { message: "Registrasi berhasil" };
  },

  // ======= LOGIN =======
  async login(username, password) {
    const result = await dsn.query("SELECT * FROM users WHERE username=$1 AND password=$2", [
      username,
      password,
    ]);

    if (result.rows.length === 0) {
      throw new Error("Username atau password salah");
    }

    const user = result.rows[0];
    return { message: "Login berhasil", user: { id: user.id, username: user.username } };
  },
};

export default userRepo;
