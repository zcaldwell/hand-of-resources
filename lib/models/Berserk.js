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
};
