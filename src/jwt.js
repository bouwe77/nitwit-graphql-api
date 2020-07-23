import jwt from "jsonwebtoken";

export function getUserFromToken(headers, secret) {
  if (!headers || !headers.authorization) return null;

  const token = headers.authorization;

  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    return null;
  }

  if (!decoded) return null;

  return decoded.user;
}

export function createSignedToken(user, secret) {
  if (!user) throw new Error("Unauthenticated");

  return jwt.sign(
    {
      user: { username: user.username },
    },
    secret,
    {
      expiresIn: "1y",
    }
  );
}
