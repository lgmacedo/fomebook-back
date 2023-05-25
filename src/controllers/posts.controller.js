import {
  insertNewFollow,
  insertNewLike,
  insertNewPost,
  searchSession,
  searchUser,
  searchUserPosts,
  searchPost,
  checkFollow,
  checkLike,
} from "../repositories/posts.repository.js";

export async function getFeed(_req, res) {
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

export async function getUser(req, res) {
  const { token } = res.locals;
  const { id } = req.params;
  try {
    const sessionQuery = await searchSession(token);
    if (!sessionQuery.rowCount) return res.sendStatus(401);
    const userQuery = await searchUser(id);
    const user = userQuery.rows[0];
    user.isFollowed = false;
    const isFollowed = await checkFollow(id, sessionQuery.rows[0].userId);
    if (isFollowed.rowCount) user.isFollowed = true;
    const postsQuery = await searchUserPosts(id);
    const posts = await Promise.all(
      postsQuery.rows.map(async (p) => {
        p.wasLiked = false;
        const likeQuery = await checkLike(p.id, sessionQuery.rows[0].userId);
        if (likeQuery.rowCount) p.wasLiked = true;
        return p;
      })
    );
    return res.status(200).send({ ...user, posts });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function likePost(req, res) {
  const { token } = res.locals;
  const { id } = req.body;
  try {
    const sessionQuery = await searchSession(token);
    if (!sessionQuery.rowCount) return res.sendStatus(401);
    const userId = sessionQuery.rows[0].userId;
    const postQuery = await searchPost(id);
    if (!postQuery.rowCount) return res.status(404).send("Post não encontrado");
    await insertNewLike(id, userId);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function followUser(req, res) {
  const { token } = res.locals;
  const { id } = req.body;
  try {
    const sessionQuery = await searchSession(token);
    if (!sessionQuery.rowCount) return res.sendStatus(401);
    const userId = sessionQuery.rows[0].userId;
    const userQuery = await searchUser(id);
    if (!userQuery.rowCount)
      return res.status(404).send("Usuário não encontrado");
    await insertNewFollow(id, userId);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
