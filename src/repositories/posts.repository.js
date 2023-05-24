import { db } from "../database/database.connect.js";

export async function searchSession(token) {
  return db.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
}

export async function searchUser(id) {
  return db.query(
    `SELECT id, name, bio, "userPicture"
    FROM users
    WHERE id = $1;`,
    [id]
  );
}

export async function searchUserPosts(id) {
  return db.query(
    `SELECT
          posts.id AS id,
          posts."postPicture" AS "postPicture",
          posts."postDescription" AS "postDescription",
          CAST(COUNT(likes."postId") AS integer) AS "timesLiked",
          TO_CHAR(posts."createdAt", 'YYYY-MM-DD HH24:MI:SS') AS "createdAt"
    FROM posts
    LEFT JOIN likes ON likes."postId" = posts.id
    WHERE posts."userId" = $1
    GROUP BY posts.id;`,
    [id]
  );
}
