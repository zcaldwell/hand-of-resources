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

  static async updateById(id, attributes) {
    const existingBirthday = await Birthday.findById(id);
    const updatedAttributes = { ...existingBirthday, ...attributes };
    const { name, date } = updatedAttributes;
    const { rows } = await pool.query(
      `
        UPDATE
          birthdays
        SET
          name=$1,
          date=$2
        WHERE
          id=$3
        RETURNING
          *
        `,
      [name, date, id]
    );
    return new Birthday(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
          birthdays
        WHERE
          id=$1
        RETURNING
          *
        `,
      [id]
    );
    return new Birthday(rows[0]);
  }
};
