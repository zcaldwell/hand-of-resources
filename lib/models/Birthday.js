const pool = require('../utils/pool');

module.exports = class Birthday {
  id;
  name;
  date;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.date = new Date(row.date).toLocaleDateString('en-US');
  }

  static async insert({ name, date }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          birthdays (name, date)
        VALUES
          ($1, $2)
        RETURNING
          *    
        `,
      [name, date]
    );
    return new Birthday(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          birthdays
        `
    );
    return rows.map((row) => new Birthday(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          birthdays
        WHERE
          id=$1
        `,
      [id]
    );
    return new Birthday(rows[0]);
  }
};
