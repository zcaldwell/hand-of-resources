const pool = require('../utils/pool');

module.exports = class Burger {
  id;
  name;
  rating;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.rating = row.rating;
  }

  static async insert({ name, rating }) {
    const { rows } = await pool.query(
      'INSERT INTO burgers(name, rating) VALUES ($1, $2) RETURNING *;',
      [name, rating]
    );
    return new Burger(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM  
            burgers
        `
    );
    return rows.map((row) => new Burger(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          burgers
        WHERE
          id=$1
        `,
      [id]
    );
    return new Burger(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingBurger = await Burger.findById(id);
    const updatedAttributes = { ...existingBurger, ...attributes };
    const { name, rating } = updatedAttributes;
    const { rows } = await pool.query(
      `
        UPDATE
          burgers
        SET
          name=$1,
          rating=$2
        WHERE
          id=$3
        RETURNING
          *
     `,
      [name, rating, id]
    );
    return new Burger(rows[0]);
  }
};
