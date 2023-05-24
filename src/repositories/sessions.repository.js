import { db } from "../database/database.connect.js";

export async function insertNewSession(id, token) {
  db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [
    id,
    token,
  ]);
}
