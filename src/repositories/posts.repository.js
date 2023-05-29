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

export async function searchPost(id) {
  return db.query(`SELECT * FROM posts WHERE id = $1;`, [id]);
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

export async function checkFollow(followed, following) {
  return db.query(
    `SELECT * FROM followers WHERE "userId" = $1 AND "followedBy" = $2;`,
    [followed, following]
  );
}

export async function unfollow(followed, following) {
  return db.query(
    `DELETE FROM followers WHERE "userId" = $1 AND "followedBy" = $2;`,
    [followed, following]
  );
}

export async function checkLike(postId, userId) {
  return db.query(`SELECT * FROM likes WHERE "postId" = $1 AND "userId" = $2;`, [
    postId,
    userId,
  ]);
}

export async function dislike(postId, userId) {
  return db.query(`DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2;`, [
    postId,
    userId,
  ]);
}

export async function insertNewPost(id, picture, description) {
  db.query(
    `INSERT INTO posts ("userId", "postPicture", "postDescription") VALUES ($1, $2, $3);`,
    [id, picture, description]
  );
}

export async function insertNewLike(postId, userId) {
  db.query(`INSERT INTO likes ("postId", "userId") VALUES ($1, $2);`, [
    postId,
    userId,
  ]);
}

export async function insertNewFollow(followingId, userId) {
  db.query(`INSERT INTO followers ("userId", "followedBy") VALUES ($1, $2);`, [
    followingId,
    userId,
  ]);
}
