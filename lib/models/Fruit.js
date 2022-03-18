const pool = require('../utils/pool');

module.exports = class Fruit {
  id;
  name;
  isStoneFruit;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.isStoneFruit = row.is_stone_fruit;
  }

  static async insert({ name, isStoneFruit }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
            fruits (name, is_stone_fruit)
          VALUES
            ($1, $2)
          RETURNING
            *
          `,
      [name, isStoneFruit]
    );
    return new Fruit(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            fruits
        `
    );
    return rows.map((row) => new Fruit(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM 
          fruits
        WHERE
          id=$1
          `,
      [id]
    );
    return new Fruit(rows[0]);
  }
};
