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
    
    next();

  } 
  catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
  
};
