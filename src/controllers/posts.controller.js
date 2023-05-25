import {
  insertNewPost,
  searchSession,
  searchUser,
  searchUserPosts,
} from "../repositories/posts.repository.js";

export async function getFeed(req, res) {
  const { token } = res.locals;
  try {
    const sessionQuery = await searchSession(token);
    if (!sessionQuery.rowCount) return res.sendStatus(401);
    const userId = sessionQuery.rows[0].userId;
    const userQuery = await searchUser(userId);
    const user = userQuery.rows[0];
    const postsQuery = await searchUserPosts(userId);
    const posts = postsQuery.rows;
    return res.status(200).send({ ...user, posts });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function newPost(req, res) {
  const { token } = res.locals;
  const { picture, description } = req.body;
  try {
    const sessionQuery = await searchSession(token);
    if (!sessionQuery.rowCount) return res.sendStatus(401);
    const userId = sessionQuery.rows[0].userId;
    await insertNewPost(userId, picture, description);
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
