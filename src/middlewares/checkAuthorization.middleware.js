export default function checkAuthorization(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);
  res.locals.token = token;
  next();
}