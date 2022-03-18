const pool = require('../utils/pool');

module.exports = class Jojo {
  id;
  name;
  part;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.part = row.part;
  }

  static async insert({ name, part }) {
    const { rows } = await pool.query(
      'INSERT INTO jojos(name, part) VALUES ($1, $2) RETURNING *;',
      [name, part]
    );
    return new Jojo(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM  
            jojos
        `
    );
    return rows.map((row) => new Jojo(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          jojos
        WHERE
          id=$1
        `,
      [id]
    );
    return new Jojo(rows[0]);
  }
};
