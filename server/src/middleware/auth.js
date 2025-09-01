import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If your token payload is { user: { id } }
    if (decoded.user) {
      req.user = decoded.user; // { id: ... }
    } else {
      // If your payload contains id + email directly
      req.user = { id: decoded.id, email: decoded.email };
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
}
