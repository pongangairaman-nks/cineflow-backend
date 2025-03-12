import jwt from "jsonwebtoken";

export const authenticationToken = (req, res, next) => {
  const token = req.header("Authorization")?.split("")[1];
  if (!token)
    return res.status(401).json({
      message: "Access Denied"
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); //moves to next middleware or controller
  } catch (error) {
    res.status(403).json({
      error: "Invalid token"
    });
  }
};
