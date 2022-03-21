const pool = require('../utils/pool');

module.exports = class Berserk {
  id;
  arc;
  arcStart;
  arcEnd;

  constructor(row) {
    this.id = row.id;
    this.arc = row.arc;
    this.arcStart = row.arc_start;
    this.arcEnd = row.arc_end;
  }

  static async insert({ arc, arcStart, arcEnd }) {
    const { rows } = await pool.query(
      `
         INSERT INTO 
            berserk (arc, arc_start, arc_end)
         VALUES
            ($1, $2, $3) 
         RETURNING 
            *
      `,
      [arc, arcStart, arcEnd]
    );
    return new Berserk(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        berserk
      `
    );
    return rows.map((row) => new Berserk(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM 
          berserk
        WHERE
          id=$1
          `,
      [id]
    );
    return new Berserk(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingArc = await Berserk.findById(id);
    const updatedAttributes = { ...existingArc, ...attributes };
    const { arc, arcStart, arcEnd } = updatedAttributes;
    const { rows } = await pool.query(
      `
        UPDATE
          berserk
        SET
          arc=$1,
          arc_start=$2,
          arc_end=$3
        WHERE
          id=$4
        RETURNING
          *
        `,
      [arc, arcStart, arcEnd, id]
    );
    return new Berserk(rows[0]);
  }
};
