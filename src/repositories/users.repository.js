import { db } from "../database/database.connect.js";

export async function searchEmail(email) {
  return db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
}

export async function insertNewUser(user, password) {
  db.query(
    `INSERT INTO users (name, email, "userPicture", bio, password) VALUES ($1, $2, $3, $4, $5);`,
    [user.name, user.email, user.userPicture, user.bio, password]
  );
}

export async function searchFollowers(id) {
  return db.query(
  `SELECT followers."followedBy" AS id, users."userPicture" AS "userPicture", users.name AS "name", users.bio AS "bio"
  FROM followers 
  JOIN users ON followers."followedBy" = users.id
  WHERE followers."userId" = $1;`, [id]);
}

export async function searchFollowing(id) {
  return db.query(
  `SELECT followers."userId" AS id, users."userPicture" AS "userPicture", users.name AS "name", users.bio AS "bio"
  FROM followers 
  JOIN users ON followers."userId" = users.id
  WHERE followers."followedBy" = $1;`, [id]);
}
