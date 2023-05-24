import { db } from "../database/database.connect.js";

export async function checkEmail(email) {
  const result = db.query(`SELECT * FROM users WHERE email = $1;`, [
    email,
  ]);
  return result;
}

export async function insertNewUser(user, password) {
  db.query(
    `INSERT INTO users (name, email, "userPicture", bio, password) VALUES ($1, $2, $3, $4, $5);`,
    [user.name, user.email, user.userPicture, user.bio, password]
  );
}