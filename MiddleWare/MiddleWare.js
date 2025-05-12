import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = verified;
    req.userId=verified.userId;
    req.userRole=verified.role;
    
    next();

  } 
  catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
  
};
export function isAdmin(req, res, next) {
  if (req.userRole === 'admin') {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
  }
}